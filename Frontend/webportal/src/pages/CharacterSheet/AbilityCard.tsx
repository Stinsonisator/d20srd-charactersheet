import { useRef, useState } from 'react';

import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CalculationResultPopover from '../../components/CalculationResultPopover';
import { Ability } from '../../types/Ability';
import { CharacterSheetData } from '../../types/CharacterSheetData';
import { displayModifier, getAbilityCode } from '../../utils';
import { getAbilityModifier } from '../../utils/calculations';

interface Props {
	character: CharacterSheetData;
	ability: Ability;
}

function AbilityCard({ character, ability }: Props): JSX.Element {
	const cardRef = useRef<HTMLDivElement>();
	const [showDetails, setShowDetails] = useState(false);

	return (
		<Paper sx={{ width: { xs: '100%', md: '60%' } }}>
			<Box ref={cardRef} display="flex" flexDirection="column" alignItems="center" onClick={() => setShowDetails(true)}>
				<Typography fontSize={20}>{getAbilityCode(ability)}</Typography>
				<Typography fontSize={40} width="100%" textAlign="center">
					{displayModifier(getAbilityModifier(character.abilities[ability].value))}
				</Typography>
				<Typography fontSize={15}>{character.abilities[ability].value}</Typography>
			</Box>
			<CalculationResultPopover
				open={showDetails}
				anchorRef={cardRef}
				onClose={() => setShowDetails(false)}
				title={ability}
				calculationSteps={character.abilities[ability].calculationSteps}
			/>
		</Paper>
	);
}

export default AbilityCard;
