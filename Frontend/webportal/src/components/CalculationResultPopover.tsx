import { Fragment, MutableRefObject } from 'react';

import { Box, capitalize, Popover, Typography } from '@mui/material';
import map from 'lodash/map';

import { CalculationStep, ConditionalCalculationStep } from '../types/CharacterSheetData';
import { displayModifier } from '../utils';

interface Props {
	anchorRef: MutableRefObject<Element>;
	open: boolean;
	onClose: (event: Record<string, unknown>, reason: 'backdropClick' | 'escapeKeyDown') => void;
	title: string;
	calculationSteps: CalculationStep[];
	conditionalValue?: number;
	conditionalcalculationSteps?: ConditionalCalculationStep[];
}

function CalculationResultPopover({
	anchorRef,
	open,
	onClose,
	title,
	calculationSteps,
	conditionalValue,
	conditionalcalculationSteps
}: Props): JSX.Element {
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
				{conditionalValue && (
					<>
						<Box display="flex" justifyContent="space-between" mt={2} sx={(theme) => ({ color: theme.palette.warning.dark })}>
							<Typography>Conditional modifier:</Typography>
							<Typography>{displayModifier(conditionalValue)}</Typography>
						</Box>
						{map(conditionalcalculationSteps, (conditionalStep, index) => (
							<Fragment key={`${title}_conditionalstep_${index}`}>
								<Box display="flex" justifyContent="space-between" mt={index > 0 && 1}>
									<Typography>
										{conditionalStep.description}
										{conditionalStep.value !== undefined ? ':' : ''}
									</Typography>
									{conditionalStep.value !== undefined && <Typography ml={2}>{conditionalStep.value}</Typography>}
								</Box>
								<Typography ml={1}>{conditionalStep.condition}</Typography>
							</Fragment>
						))}
					</>
				)}
			</Box>
		</Popover>
	);
}

export default CalculationResultPopover;
