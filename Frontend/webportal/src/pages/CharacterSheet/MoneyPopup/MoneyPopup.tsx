import { useCallback, useEffect, useState } from 'react';

import { Box, Button, capitalize, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, Stack, Typography } from '@mui/material';
import { Form, Formik, FormikErrors } from 'formik';

import { usePartialUpdateCharacterMutation } from '../../../services/api';
import { globalDerender } from '../../../services/globalRenderSlice';
import { Coin, CoinPouch } from '../../../types/Money';
import { useAppDispatch } from '../../../utils/hooks';
import MoneyPopupForm from './MoneyPopupForm';

interface Props {
	renderKey: string;
	mutation: 'gain' | 'lose';
	coinPouch: CoinPouch;
}

export type Mutation = Partial<Pick<CoinPouch, 'copper' | 'silver' | 'gold' | 'platinum'>>;

export interface MoneyPopUpModel {
	toPay: Mutation;
	paying: Mutation;
	change: Mutation;
}

function validate(values: MoneyPopUpModel): FormikErrors<Mutation> {
	const errors: FormikErrors<Mutation> = {};

	return errors;
}

export default function MoneyPopup({ renderKey, mutation, coinPouch }: Props): JSX.Element {
	const [noExactChange, setNoExactChange] = useState(false);
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
		<Dialog onClose={handleClose} open fullWidth maxWidth="sm" PaperProps={{ sx: { position: 'fixed', top: 50 } }}>
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
						toPay: {},
						paying: {},
						change: {}
					}}
					validate={validate}
					onSubmit={(values: MoneyPopUpModel) => {
						const newPouch = {
							copper: coinPouch.copper,
							silver: coinPouch.silver,
							gold: coinPouch.gold,
							platinum: coinPouch.platinum
						};
						let performUpdate = false;
						if (mutation === 'gain') {
							for (const pouchKey in values.toPay) {
								const coin: Coin = pouchKey as Coin;
								if (values.toPay[coin]) {
									newPouch[coin] = (newPouch[coin] || 0) + values.toPay[coin];
								}
							}
							performUpdate = true;
						} else if (mutation === 'lose') {
							// TODO: lose
						}
						if (performUpdate) {
							update({
								id: coinPouch.id,
								...newPouch
							});
						}
					}}
				>
					<Form id="moneyPopup">
						<Stack py={2} spacing={2}>
							{mutation === 'lose' && (
								<>
									<Typography>In your pouch you have:</Typography>
									<Grid container columns={4}>
										<Grid item xs={1}>
											<Typography textAlign="center">{coinPouch.copper || 0} cp</Typography>
										</Grid>
										<Grid item xs={1}>
											<Typography textAlign="center">{coinPouch.silver || 0} sp</Typography>
										</Grid>
										<Grid item xs={1} textAlign="center">
											<Typography>{coinPouch.gold || 0} gp</Typography>
										</Grid>
										<Grid item xs={1} textAlign="center">
											<Typography>{coinPouch.platinum || 0} pp</Typography>
										</Grid>
									</Grid>
									<Typography>You have to have lost: </Typography>
								</>
							)}
							<MoneyPopupForm modelField="toPay" />
							{noExactChange && <MoneyPopupForm modelField="paying" />}
						</Stack>
					</Form>
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
