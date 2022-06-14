import { useRef, useState } from 'react';

import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CalculationResultPopover from '../../components/CalculationResultPopover';
import { CharacterSheetSkill } from '../../types/CharacterSheetData';
import { displayModifier } from '../../utils';

interface Props {
	skill: CharacterSheetSkill;
}

function SkillCard({ skill }: Props): JSX.Element {
	const cardRef = useRef<HTMLDivElement>();
	const [showDetails, setShowDetails] = useState(false);

	return (
		<Paper sx={{ width: '100%' }}>
			<Box
				ref={cardRef}
				py={1}
				display="flex"
				flexDirection="row"
				justifyContent="space-around"
				sx={{ opacity: skill.modifier.value !== null ? 1 : 0.3 }}
				onClick={() => setShowDetails(true)}
			>
				<Typography pl={2} flexGrow={1} whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
					{skill.name}
				</Typography>
				<Typography width={40}>{skill.modifier.value !== null ? displayModifier(skill.modifier.value) : '/'}</Typography>
			</Box>
			<CalculationResultPopover
				open={showDetails}
				anchorRef={cardRef}
				onClose={() => setShowDetails(false)}
				title={skill.name}
				calculationSteps={skill.modifier.calculationSteps}
			/>
		</Paper>
	);
}

export default SkillCard;
