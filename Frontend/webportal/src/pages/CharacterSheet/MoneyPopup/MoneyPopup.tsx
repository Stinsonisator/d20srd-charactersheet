import { useCallback, useEffect } from 'react';

import { Box, Button, capitalize, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton } from '@mui/material';
import { Formik, FormikErrors } from 'formik';

import { usePartialUpdateCharacterMutation } from '../../../services/api';
import { globalDerender } from '../../../services/globalRenderSlice';
import { Character } from '../../../types/Character';
import { useAppDispatch } from '../../../utils/hooks';
import MoneyPopupForm from './MoneyPopupForm';

export type Coin = keyof Pick<Character, 'copper' | 'silver' | 'gold' | 'platinum'>;

interface Props {
	renderKey: string;
	mutation: 'gain' | 'lose';
	character: Character;
	coin: Coin;
}

export interface Mutation {
	amount: number;
}

function validate(values: Mutation): FormikErrors<Mutation> {
	const errors: FormikErrors<Mutation> = {};

	if (!values.amount) {
		errors.amount = 'Required';
	}

	return errors;
}

export default function MoneyPopup({ renderKey, mutation, character, coin }: Props): JSX.Element {
	const [update, result] = usePartialUpdateCharacterMutation();
	const reduxDispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	useEffect(() => {
		if (!result.isLoading && result.isSuccess) {
			handleClose();
		}
	}, [handleClose, result.isLoading, result.isSuccess]);

	return (
		<Dialog onClose={handleClose} open fullWidth maxWidth="xs" PaperProps={{ sx: { position: 'fixed', top: 50 } }}>
			<DialogTitle sx={(theme) => ({ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary })}>
				<Box display="flex" alignItems="center">
					<Box flexGrow={1}>{capitalize(mutation)} Money</Box>
					<Box>
						<IconButton onClick={handleClose}>
							<Icon className="fa-times" sx={{ fontSize: 16, color: 'text.secondary' }} />
						</IconButton>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={{
						amount: null
					}}
					validate={validate}
					onSubmit={(values: Mutation) => {
						handleClose();
						let newAmount;
						if (mutation === 'gain') {
							newAmount = (character[coin] || 0) + values.amount;
						} else if (mutation === 'lose' && character[coin] >= values.amount) {
							newAmount = character[coin] - values.amount;
						}
						update({
							id: character.id,
							[coin]: newAmount
						});
					}}
				>
					<MoneyPopupForm />
				</Formik>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Button variant="contained" color="primary" type="submit" form="moneyPopup">
					Apply
				</Button>
			</DialogActions>
		</Dialog>
	);
}
