import { Grid, Typography } from '@mui/material';

import { CharacterClass } from '../../types/Character';
import { displayModifier, getAbilityModifier, getFinalScore } from '../../utils';

interface Props {
	characterClass: CharacterClass;
	abilityCode: 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';
	abilityScore: number;
}

export function AbilityRow({ characterClass, abilityCode, abilityScore }: Props): JSX.Element {
	return (
		<>
			<Grid item xs={2}>
				<Typography>{abilityCode}</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography>{getFinalScore(characterClass, abilityCode, abilityScore)}</Typography>
			</Grid>
			<Grid item xs={2} />
			<Grid item xs={2}>
				<Typography>{displayModifier(getAbilityModifier(getFinalScore(characterClass, abilityCode, abilityScore)))}</Typography>
			</Grid>
			<Grid item xs={2} />
			<Grid item xs={2} />
		</>
	);
}
