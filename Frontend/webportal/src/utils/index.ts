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
		case 'str':
			return abilityScore + strengthBonus;
		case 'dex':
			return abilityScore + dexterityBonus;
		case 'con':
			return abilityScore + constitutionBonus;
		case 'int':
			return abilityScore + inteligenceBonus;
		case 'wis':
			return abilityScore + wisdomBonus;
		case 'cha':
			return abilityScore + charismaBonus;
	}
}

export function getAbilityCode(ability: Ability): AbilityCode {
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
