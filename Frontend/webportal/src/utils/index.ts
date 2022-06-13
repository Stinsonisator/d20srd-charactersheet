import filter from 'lodash/filter';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import some from 'lodash/some';
import sumBy from 'lodash/sumBy';

import { Abilities, Ability } from '../types/Ability';
import { Character } from '../types/Character';
import { Skill } from '../types/Skill';

export function displayModifier(modifier: number): string {
	if (modifier > 0) {
		return `+${modifier}`;
	}
	return `${modifier}`;
}

export function getAbilityScore(character: Character, ability: Ability): number {
	const traits = filter(
		character.characterClass?.traits,
		(trait) => trait.level <= (character.levels.length || 1) && 'ability' in trait.rule && trait.rule.ability === ability
	);
	const bonus = reduce(traits, (sum, trait) => sum + ('ability' in trait.rule ? trait.rule.adjustment : 0), 0);
	return character[ability] + (bonus ?? 0);
}

export function getAbilityModifierForCharacter(character: Character, ability: Ability): number {
	const score = getAbilityScore(character, ability);
	return Math.floor((score - 10) / 2);
}

export function getSkillModifier(character: Character, skill: Skill): number {
	const characterSkill = find(character.skills, { skillId: skill.id });
	if (!skill.untrained && (!characterSkill || characterSkill.points <= 0)) {
		return null;
	}

	const abilityModifier = getAbilityModifierForCharacter(character, skill.keyAbility);
	let skillModifier = 0;
	if (characterSkill?.countAsClassSkill || some(character.characterClass.classSkills, { skillId: skill.id })) {
		skillModifier = characterSkill?.points ?? 0;
	} else {
		skillModifier = Math.floor((characterSkill?.points ?? 0) / 2);
	}
	return abilityModifier + skillModifier;
}

export function getAbilityCode(ability: Ability): string {
	switch (ability) {
		case 'strength':
			return 'STR';
		case 'dexterity':
			return 'DEX';
		case 'constitution':
			return 'CON';
		case 'intelligence':
			return 'INT';
		case 'wisdom':
			return 'WIS';
		case 'charisma':
			return 'CHA';
	}
}

export function getMaxHp(character: Character): number {
	return sumBy(character.levels, 'hp') + getAbilityModifierForCharacter(character, 'constitution') * character.levels.length;
}

function getPointBuyPoints(abilityScore: number): number {
	if (abilityScore >= 8 && abilityScore <= 14) {
		return abilityScore - 8;
	} else if (abilityScore === 15) {
		return 8;
	} else if (abilityScore === 16) {
		return 10;
	} else if (abilityScore === 17) {
		return 13;
	}
	return 16;
}

export function getTotalPointBuy(abilities: Abilities): number {
	return (
		getPointBuyPoints(abilities.strength) +
		getPointBuyPoints(abilities.dexterity) +
		getPointBuyPoints(abilities.constitution) +
		getPointBuyPoints(abilities.intelligence) +
		getPointBuyPoints(abilities.wisdom) +
		getPointBuyPoints(abilities.charisma)
	);
}
