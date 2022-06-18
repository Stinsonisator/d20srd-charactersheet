import { useCallback } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton } from '@mui/material';
import { Formik, FormikErrors } from 'formik';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';

import { usePartialUpdateCharacterMutation } from '../../../services/api';
import { globalDerender } from '../../../services/globalRenderSlice';
import { Character } from '../../../types/Character';
import { useAppDispatch } from '../../../utils/hooks';
import PoolPopupForm from './PoolPopupForm';

export type UsedPoints = { amount?: number; mutation: 'increase' | 'decrease' };

interface Props {
	renderKey: string;
	character: Character;
	poolName: string;
}

function validate(values: UsedPoints): FormikErrors<UsedPoints> {
	const errors: FormikErrors<UsedPoints> = {};

	if (!values.amount) {
		errors.amount = 'Required';
	}

	return errors;
}

export default function HealPopup({ renderKey, character, poolName }: Props): JSX.Element {
	const [update] = usePartialUpdateCharacterMutation();
	const reduxDispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	return (
		<Dialog onClose={handleClose} open fullWidth maxWidth="xs" PaperProps={{ sx: { position: 'fixed', top: 50 } }}>
			<DialogTitle sx={(theme) => ({ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary })}>
				<Box display="flex" alignItems="center">
					<Box flexGrow={1}>{poolName}</Box>
					<Box>
						<IconButton onClick={handleClose}>
							<Icon className="fa-times" sx={{ fontSize: 16, color: 'text.secondary' }} />
						</IconButton>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={{ mutation: 'decrease' }}
					validate={validate}
					onSubmit={(values: UsedPoints) => {
						handleClose();
						let newCustomValues = cloneDeep(character.customValues);
						if (!newCustomValues) {
							newCustomValues = {
								poolPointsUsed: []
							};
						}
						if (!newCustomValues.poolPointsUsed) {
							newCustomValues.poolPointsUsed = [];
							newCustomValues.poolPointsUsed.push({ poolName, value: values.amount });
						} else {
							const poolPointsUsed = find(newCustomValues.poolPointsUsed, { poolName });
							if (!poolPointsUsed) {
								newCustomValues.poolPointsUsed.push({ poolName, value: values.amount });
							} else if (values.mutation === 'decrease') {
								poolPointsUsed.value += values.amount;
							} else {
								poolPointsUsed.value = Math.max(poolPointsUsed.value - values.amount, 0);
							}
						}
						update({
							id: character.id,
							customValues: newCustomValues
						});
					}}
				>
					<PoolPopupForm />
				</Formik>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Button variant="contained" color="primary" type="submit" form="poolPopup">
					Apply
				</Button>
			</DialogActions>
		</Dialog>
	);
}
