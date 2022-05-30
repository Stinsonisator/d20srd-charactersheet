import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Ability } from '../../types/Ability';
import { Character } from '../../types/Character';
import { displayModifier, getAbilityCode, getAbilityModifier, getAbilityScore } from '../../utils';

interface Props {
	character: Character;
	ability: Ability;
}

function AbilityCard({ character, ability }: Props): JSX.Element {
	return (
		<Paper sx={{ width: { xs: '100%', md: '60%' } }}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Typography fontSize={20}>{getAbilityCode(ability)}</Typography>
				<Typography fontSize={40} width="100%" textAlign="center">
					{displayModifier(getAbilityModifier(character, ability))}
				</Typography>
				<Typography fontSize={15}>{getAbilityScore(character, ability)}</Typography>
			</Box>
		</Paper>
	);
}

export default AbilityCard;
