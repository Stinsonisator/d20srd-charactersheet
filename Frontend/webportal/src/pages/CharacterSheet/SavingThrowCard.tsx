import { useRef, useState } from 'react';

import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import startCase from 'lodash/startCase';

import CalculationResultPopover from '../../components/CalculationResultPopover';
import { SavingThrowModifiers } from '../../types/BusinessRule';
import { CharacterSheetData } from '../../types/CharacterSheetData';
import { displayModifier } from '../../utils';

interface Props {
	character: CharacterSheetData;
	savingThrow: keyof SavingThrowModifiers;
}

function SavingThrowCard({ character, savingThrow }: Props): JSX.Element {
	const cardRef = useRef<HTMLDivElement>();
	const [showDetails, setShowDetails] = useState(false);

	return (
		<Paper sx={{ width: '100%' }}>
			<Box ref={cardRef} py={1} display="flex" flexDirection="row" justifyContent="space-around" onClick={() => setShowDetails(true)}>
				<Typography pl={2} flexGrow={1}>
					{startCase(savingThrow)}
				</Typography>
				<Typography width={40}>{displayModifier(character.savingThrows[savingThrow].value)}</Typography>
			</Box>
			<CalculationResultPopover
				open={showDetails}
				anchorRef={cardRef}
				onClose={() => setShowDetails(false)}
				title={savingThrow}
				calculationSteps={character.savingThrows[savingThrow].calculationSteps}
			/>
		</Paper>
	);
}

export default SavingThrowCard;
