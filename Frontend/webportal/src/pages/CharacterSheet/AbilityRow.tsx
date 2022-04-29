import { Grid, Typography } from '@mui/material';

import { CharacterClass } from '../../types/Character';

interface Props {
	characterClass: CharacterClass;
	abilityCode: 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';
	abilityScore: number;
}

function getFinalScore(characterClass: CharacterClass, abilityCode: 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA', abilityScore: number): number {
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

function displayModifier(modifier: number): string {
	if (modifier > 0) {
		return `+ ${modifier}`;
	}
	return `${modifier}`;
}

export function AbilityRow({ characterClass, abilityCode, abilityScore }: Props): JSX.Element {
	return (
		<>
			<Grid item xs={2}>
				<Typography>STR</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography>{getFinalScore(characterClass, abilityCode, abilityScore)}</Typography>
			</Grid>
			<Grid item xs={2} />
			<Grid item xs={2}>
				<Typography>{displayModifier(Math.floor((getFinalScore(characterClass, abilityCode, abilityScore) - 10) / 2))}</Typography>
			</Grid>
			<Grid item xs={2} />
			<Grid item xs={2} />
		</>
	);
}
