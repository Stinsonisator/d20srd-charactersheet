import { capitalize } from '@mui/material';
import each from 'lodash/each';
import filter from 'lodash/filter';
import find from 'lodash/find';
import findLast from 'lodash/findLast';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import some from 'lodash/some';
import sumBy from 'lodash/sumBy';
import values from 'lodash/values';

import { Ability } from '../types/Ability';
import { SavingThrowModifiers } from '../types/BusinessRule';
import { Character, CharacterSkill } from '../types/Character';
import { CharacterClassTrait } from '../types/CharacterClass';
import { CalculationResult, CharacterSheetData, CharacterSheetPool, SkillCalculationResult } from '../types/CharacterSheetData';
import { Skill } from '../types/Skill';

export function calculateCharacterSheetData(character: Character, skills: Skill[]): CharacterSheetData {
	const result: CharacterSheetData = {
		id: character.id,
		name: character.name,
		image: character.image,
		characterClass: character.characterClass,
		maxHp: 0,
		lethalDamage: character.lethalDamage,
		nonlethalDamage: character.nonlethalDamage,
		copper: character.copper,
		silver: character.silver,
		gold: character.gold,
		platinum: character.platinum,
		levels: character.levels,
		abilities: {},
		savingThrows: {},
		skills: [],
		pools: [],
		customValues: character.customValues
	};
	result.abilities.strength = getAbilityScore(character, 'strength');
	result.abilities.dexterity = getAbilityScore(character, 'dexterity');
	result.abilities.constitution = getAbilityScore(character, 'constitution');
	result.abilities.intelligence = getAbilityScore(character, 'intelligence');
	result.abilities.wisdom = getAbilityScore(character, 'wisdom');
	result.abilities.charisma = getAbilityScore(character, 'charisma');
	result.maxHp = getMaxHp(result);
	result.savingThrows.fortitude = getSavingThrowModifier(result, 'fortitude');
	result.savingThrows.reflex = getSavingThrowModifier(result, 'reflex');
	result.savingThrows.will = getSavingThrowModifier(result, 'will');
	result.skills = map(skills, (skill) => ({
		name: skill.name,
		modifier: getSkillModifier(result, character.skills, skill)
	}));
	result.pools = getPointPools(result);
	return result;
}

function getAbilityScore(character: Character, ability: Ability): CalculationResult {
	const result: CalculationResult = {
		value: character[ability],
		calculationSteps: [
			{
				value: character[ability],
				description: 'Base value'
			}
		]
	};
	const traits = filter(
		character.characterClass?.traits,
		(trait) => trait.level <= (character.levels.length || 1) && 'ability' in trait.rule && trait.rule.ability === ability
	);
	each(traits, (trait) => {
		if ('ability' in trait.rule) {
			result.value += trait.rule.adjustment;
			result.calculationSteps.push({
				value: trait.rule.adjustment,
				description: 'Class bonus'
			});
		}
	});
	return result;
}

export function getAbilityModifier(abilityScore: number): number {
	return Math.floor((abilityScore - 10) / 2);
}

function getMaxHp(character: CharacterSheetData): number {
	return sumBy(character.levels, 'hp') + getAbilityModifier(character.abilities.constitution.value) * character.levels.length;
}

function getSavingThrowModifier(character: CharacterSheetData, savingThrow: keyof SavingThrowModifiers): CalculationResult {
	let ability: Ability = 'constitution';
	switch (savingThrow) {
		case 'reflex':
			ability = 'dexterity';
			break;
		case 'will':
			ability = 'wisdom';
			break;
	}

	const abilityModifier = getAbilityModifier(character.abilities[ability].value);

	const result: CalculationResult = {
		value: abilityModifier,
		calculationSteps: [
			{
				value: abilityModifier,
				description: `${capitalize(ability)} modifier`
			}
		]
	};
	const savingThrowModifiers = findLast(
		orderBy(character.characterClass?.traits, 'level'),
		(trait) => trait.level <= (character.levels.length || 1) && 'fortitude' in trait.rule
	);
	let classBonus = 0;
	if (savingThrowModifiers && 'fortitude' in savingThrowModifiers.rule) {
		classBonus = savingThrowModifiers.rule[savingThrow];

		result.value += classBonus;
		result.calculationSteps.push({
			value: classBonus,
			description: `Class bonus (level ${savingThrowModifiers.level})`
		});
	}
	return result;
}

function getSkillModifier(character: CharacterSheetData, characterSkills: CharacterSkill[], skill: Skill): SkillCalculationResult {
	const characterSkill = find(characterSkills, { skillId: skill.id });
	if (!skill.untrained && (!characterSkill || characterSkill.points <= 0)) {
		return {
			value: null,
			calculationSteps: [
				{
					value: undefined,
					description: 'Untrained not allowed'
				}
			],
			conditionalCalculationSteps: []
		};
	}
	const abilityModifier = getAbilityModifier(character.abilities[skill.keyAbility].value);

	const result: SkillCalculationResult = {
		value: abilityModifier,
		calculationSteps: [
			{
				value: abilityModifier,
				description: `${capitalize(skill.keyAbility)} modifier`
			}
		],
		conditionalCalculationSteps: []
	};

	if (characterSkill && characterSkill.points) {
		let skillModifier = 0;
		let calculationStepDescription;
		if (characterSkill.countAsClassSkill || some(character.characterClass.classSkills, { skillId: skill.id })) {
			skillModifier = characterSkill.points;
			calculationStepDescription = `${characterSkill.points} class skill ranks`;
		} else {
			skillModifier = Math.floor((characterSkill?.points ?? 0) / 2);
			calculationStepDescription = `${characterSkill.points} cross-class skill ranks`;
		}

		result.value += skillModifier;
		result.calculationSteps.push({
			value: skillModifier,
			description: calculationStepDescription
		});
	}

	each(orderBy(skill.incomingSkillSyngergies, 'isConditional'), (skillSynergy) => {
		const sourceCharacterSkill = find(characterSkills, { skillId: skillSynergy.sourceSkillId });
		if (sourceCharacterSkill && sourceCharacterSkill.points >= 5 && !skillSynergy.isConditional) {
			result.value += 2;
			result.calculationSteps.push({
				value: 2,
				description: `Skill synergy with ${skillSynergy.sourceSkill.name}`
			});
		} else if (sourceCharacterSkill && sourceCharacterSkill.points >= 5 && skillSynergy.isConditional) {
			if (result.value !== result.conditionalValue) result.conditionalValue = result.value + 2;
			result.conditionalCalculationSteps.push({
				value: 2,
				description: `Skill synergy with ${skillSynergy.sourceSkill.name}`,
				condition: skillSynergy.conditionDescription
			});
		}
	});
	return result;
}

function getPointPools(character: CharacterSheetData): CharacterSheetPool[] {
	const groupedPoolTraits = groupBy(
		filter(character.characterClass?.traits, (trait) => 'poolName' in trait.rule),
		'rule.poolName'
	);

	return map(values(groupedPoolTraits), (traits) => {
		const trait = findLast(orderBy(traits, 'level'), (trait) => trait.level <= (character.levels.length || 1));
		return getPointPool(trait, character);
	});
}

function getPointPool(trait: CharacterClassTrait, character: CharacterSheetData): CharacterSheetPool {
	if ('poolName' in trait.rule) {
		const remaining = character.customValues && find(character.customValues.poolPointsUsed, { poolName: trait.rule.poolName })?.value;
		if ('max' in trait.rule) {
			return {
				name: trait.rule.poolName,
				remaining: trait.rule.max - remaining || trait.rule.max,
				total: trait.rule.max
			};
		} else if ('base' in trait.rule) {
			let total = Math.floor((getAbilityModifier(character.abilities[trait.rule.keyAbility].value) * character.levels.length) / 2);
			if (total < 0) {
				total = 0;
			}
			total += trait.rule.base;
			return {
				name: trait.rule.poolName,
				remaining: total - remaining || total,
				total
			};
		}
	}
}
