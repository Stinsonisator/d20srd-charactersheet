import filter from 'lodash/filter';
import reduce from 'lodash/reduce';

import { Abilities, Ability } from '../types/Ability';
import { Character } from '../types/Character';

export function getAbilityModifier(character: Character, ability: Ability): number {
	const score = getFinalScore(character, ability);
	return Math.floor((score - 10) / 2);
}

export function displayModifier(modifier: number): string {
	if (modifier > 0) {
		return `+ ${modifier}`;
	}
	return `${modifier}`;
}

export function getFinalScore(character: Character, ability: Ability): number {
	const traits = filter(character.characterClass?.traits, (trait) => trait.level <= (character.levels.length || 1) && 'ability' in trait.rule && trait.rule.ability === ability);
	const bonus = reduce(traits, (sum, trait) => sum + trait.rule.adjustment, 0);
	return character[ability] + (bonus ?? 0);
}

export function getAbilityCode(ability: Ability): string {
	switch (ability) {
		case 'strength':
			return 'str';
		case 'dexterity':
			return 'dex';
		case 'constitution':
			return 'con';
		case 'intelligence':
			return 'int';
		case 'wisdom':
			return 'wis';
		case 'charisma':
			return 'cha';
	}
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
