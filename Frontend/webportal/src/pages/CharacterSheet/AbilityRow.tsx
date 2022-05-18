import { Grid, Typography } from '@mui/material';

import { Ability } from '../../types/Ability';
import { Character } from '../../types/Character';
import { displayModifier, getAbilityCode, getAbilityModifier, getFinalScore } from '../../utils';

interface Props {
	character: Character;
	ability: Ability;
}

export function AbilityRow({ character, ability }: Props): JSX.Element {
	return (
		<>
			<Grid item xs={2}>
				<Typography>{getAbilityCode(ability)}</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography>{getFinalScore(character, ability)}</Typography>
			</Grid>
			<Grid item xs={2} />
			<Grid item xs={2}>
				<Typography>{displayModifier(getAbilityModifier(getFinalScore(character, ability)))}</Typography>
			</Grid>
			<Grid item xs={2} />
			<Grid item xs={2} />
		</>
	);
}
