import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Ability } from '../../types/Ability';
import { Character } from '../../types/Character';
import { displayModifier, getAbilityCode, getAbilityModifier, getFinalScore } from '../../utils';

interface Props {
	character: Character;
	ability: Ability;
}
function AbilityCard({ character, ability }: Props): JSX.Element {
	return (
		<Box display="flex" flexDirection="column" alignItems="center" border="1px solid" width="60%" borderRadius={2}>
			<Typography fontSize={20}>{getAbilityCode(ability)}</Typography>
			<Typography fontSize={40} borderTop="1px solid" borderBottom="1px solid" width="100%" textAlign="center">
				{displayModifier(getAbilityModifier(character, ability))}
			</Typography>
			<Typography fontSize={15}>{getFinalScore(character, ability)}</Typography>
		</Box>
	);
}

export default AbilityCard;
