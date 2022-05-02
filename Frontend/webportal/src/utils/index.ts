import forOwn from 'lodash/forOwn';

import { Ability, AbilityCode } from '../types';
import { Abilities, CharacterClass } from '../types/Character';

export function getAbilityModifier(score: number): number {
	return Math.floor((score - 10) / 2);
}

export function displayModifier(modifier: number): string {
	if (modifier > 0) {
		return `+ ${modifier}`;
	}
	return `${modifier}`;
}

export function getFinalScore(characterClass: CharacterClass, abilityCode: AbilityCode, abilityScore: number): number {
	let strengthBonus = 0;
	let dexterityBonus = 0;
	let constitutionBonus = 0;
	const inteligenceBonus = 0;
	const wisdomBonus = 0;
	const charismaBonus = 0;

	switch (characterClass) {
		case 'blackBelt':
			strengthBonus = 1;
			dexterityBonus = 1;
			constitutionBonus = 2;
			break;
	}

	switch (abilityCode) {
		case 'STR':
			return abilityScore + strengthBonus;
		case 'DEX':
			return abilityScore + dexterityBonus;
		case 'CON':
			return abilityScore + constitutionBonus;
		case 'INT':
			return abilityScore + inteligenceBonus;
		case 'WIS':
			return abilityScore + wisdomBonus;
		case 'CHA':
			return abilityScore + charismaBonus;
	}
}

export function getAbilityCode(ability: Ability): AbilityCode {
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
