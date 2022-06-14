import { MutableRefObject } from 'react';

import { Box, capitalize, Popover, Typography } from '@mui/material';
import map from 'lodash/map';

import { CalculationStep } from '../types/CharacterSheetData';

interface Props {
	anchorRef: MutableRefObject<Element>;
	open: boolean;
	onClose: (event: Record<string, unknown>, reason: 'backdropClick' | 'escapeKeyDown') => void;
	title: string;
	calculationSteps: CalculationStep[];
}

function CalculationResultPopover({ anchorRef, open, onClose, title, calculationSteps }: Props): JSX.Element {
	return (
		<Popover
			anchorEl={anchorRef.current}
			open={open}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center'
			}}
		>
			<Box display="flex" flexDirection="column" p={2}>
				<Typography variant="h6" gutterBottom textAlign="center">
					{capitalize(title)}
				</Typography>
				{map(calculationSteps, (step, index) => (
					<Box key={`${title}_step_${index}`} display="flex" justifyContent="space-between">
						<Typography>
							{step.description}
							{step.value !== undefined ? ':' : ''}
						</Typography>
						{step.value !== undefined && <Typography ml={2}>{step.value}</Typography>}
					</Box>
				))}
			</Box>
		</Popover>
	);
}

export default CalculationResultPopover;
