import { capitalize } from '@mui/material';
import each from 'lodash/each';
import filter from 'lodash/filter';
import findLast from 'lodash/findLast';
import orderBy from 'lodash/orderBy';

import { Ability } from '../types/Ability';
import { SavingThrowModifiers } from '../types/BusinessRule';
import { Character } from '../types/Character';
import { CalculationResult, CharacterSheetData } from '../types/CharacterSheetData';

export function calculateCharacterSheetData(character: Character): CharacterSheetData {
	const result: CharacterSheetData = { abilities: {}, savingThrows: {} };
	result.abilities.strength = getAbilityScore(character, 'strength');
	result.abilities.dexterity = getAbilityScore(character, 'dexterity');
	result.abilities.constitution = getAbilityScore(character, 'constitution');
	result.abilities.intelligence = getAbilityScore(character, 'intelligence');
	result.abilities.wisdom = getAbilityScore(character, 'wisdom');
	result.abilities.charisma = getAbilityScore(character, 'charisma');
	result.savingThrows.fortitude = getSavingThrowModifier(character, result, 'fortitude');
	result.savingThrows.reflex = getSavingThrowModifier(character, result, 'reflex');
	result.savingThrows.will = getSavingThrowModifier(character, result, 'will');
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

function getSavingThrowModifier(
	character: Character,
	characterSheetData: CharacterSheetData,
	savingThrow: keyof SavingThrowModifiers
): CalculationResult {
	let ability: Ability = 'constitution';
	switch (savingThrow) {
		case 'reflex':
			ability = 'dexterity';
			break;
		case 'will':
			ability = 'wisdom';
			break;
	}

	const abilityModifier = getAbilityModifier(characterSheetData.abilities[ability].value);

	const result: CalculationResult = {
		value: abilityModifier,
		calculationSteps: [
			{
				value: abilityModifier,
				description: `${capitalize(ability)} score`
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
