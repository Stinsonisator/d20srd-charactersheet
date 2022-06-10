import { useCallback } from 'react';

import { Box, Button, capitalize, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton } from '@mui/material';
import { Formik, FormikErrors } from 'formik';

import { usePartialUpdateCharacterMutation } from '../../../services/api';
import { globalDerender } from '../../../services/globalRenderSlice';
import { Character } from '../../../types/Character';
import { useAppDispatch } from '../../../utils/hooks';
import MoneyPopupForm from './MoneyPopupForm';

export type Money = Pick<Character, 'copper' | 'silver' | 'gold' | 'platinum'>;

interface Props {
	renderKey: string;
	mutation: 'gain' | 'lose';
	character: Character;
}

function validate(values: Money): FormikErrors<Money> {
	const errors: FormikErrors<Money> = {};

	return errors;
}

function getMoneyUpdate(currentMoney: Money, moneyMutation: Money, mutation: 'gain' | 'lose'): Money {
	if (mutation === 'gain') {
		return {
			copper: typeof moneyMutation.copper === 'number' ? (currentMoney.copper || 0) + (moneyMutation.copper || 0) : undefined,
			silver: typeof moneyMutation.silver === 'number' ? (currentMoney.silver || 0) + (moneyMutation.silver || 0) : undefined,
			gold: typeof moneyMutation.gold === 'number' ? (currentMoney.gold || 0) + (moneyMutation.gold || 0) : undefined,
			platinum: typeof moneyMutation.platinum === 'number' ? (currentMoney.platinum || 0) + (moneyMutation.platinum || 0) : undefined
		};
	}
}

export default function MoneyPopup({ renderKey, mutation, character }: Props): JSX.Element {
	const [update] = usePartialUpdateCharacterMutation();
	const reduxDispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

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
						copper: null,
						silver: null,
						gold: null,
						platinum: null
					}}
					validate={validate}
					onSubmit={(values: Money) => {
						handleClose();
						update({
							id: character.id,
							...getMoneyUpdate(character, values, mutation)
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
