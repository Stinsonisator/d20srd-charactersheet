import { useCallback, useEffect, useState } from 'react';

import { Box, Button, capitalize, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, Typography } from '@mui/material';
import { Form, Formik, FormikErrors } from 'formik';

import { usePartialUpdateCharacterMutation } from '../../../services/api';
import { globalDerender } from '../../../services/globalRenderSlice';
import { Coin, CoinPouch, Mutation } from '../../../types/Money';
import { useAppDispatch } from '../../../utils/hooks';
import { getTotalInCopper } from '../../../utils/money';
import ActualAmountPayingForm from './ActualAmountPayingForm';
import ActualMutationForm from './ActualMutationForm';

interface Props {
	renderKey: string;
	mutation: 'gain' | 'lose';
	coinPouch: CoinPouch;
}

export interface MoneyPopUpModel {
	actualMutation: Mutation;
	actualAmountPaying: Mutation;
	change: Mutation;
}

function setChangeError(coinPouch: CoinPouch, values: MoneyPopUpModel, errors: FormikErrors<MoneyPopUpModel>, coin: Coin) {
	if (values.actualAmountPaying[coin] > coinPouch[coin]) {
		if (!errors.actualAmountPaying) {
			errors.actualAmountPaying = {};
		}
		errors.actualAmountPaying[coin] = `You don't have ${values.actualAmountPaying[coin]} ${coin}`;
	}
}

export default function MoneyPopup({ renderKey, mutation, coinPouch }: Props): JSX.Element {
	const [hasExactChange, sethasExactChange] = useState(true);
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

	function validate(values: MoneyPopUpModel): FormikErrors<MoneyPopUpModel> {
		const errors: FormikErrors<MoneyPopUpModel> = {};
		if (mutation === 'lose' && !hasExactChange) {
			setChangeError(coinPouch, values, errors, 'copper');
			setChangeError(coinPouch, values, errors, 'silver');
			setChangeError(coinPouch, values, errors, 'gold');
			setChangeError(coinPouch, values, errors, 'platinum');
			if (getTotalInCopper(values.actualMutation) > getTotalInCopper(values.actualAmountPaying)) {
				errors.change = {
					copper: 'You are not paying enough'
				};
			}
		}
		return errors;
	}

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
						actualMutation: {},
						actualAmountPaying: {},
						change: {}
					}}
					validate={validate}
					validateOnBlur
					validateOnChange
					onSubmit={(values: MoneyPopUpModel) => {
						const newPouch = {
							copper: coinPouch.copper,
							silver: coinPouch.silver,
							gold: coinPouch.gold,
							platinum: coinPouch.platinum
						};
						let performUpdate = false;
						if (mutation === 'gain') {
							for (const pouchKey in values.actualMutation) {
								const coin: Coin = pouchKey as Coin;
								if (values.actualMutation[coin]) {
									newPouch[coin] = (newPouch[coin] || 0) + values.actualMutation[coin];
								}
							}
							performUpdate = true;
						} else if (mutation === 'lose' && hasExactChange) {
							let hasNeededCoins = true;
							for (const pouchKey in values.actualMutation) {
								const coin: Coin = pouchKey as Coin;
								if ((newPouch[coin] || 0) < values.actualMutation[coin]) {
									sethasExactChange(false);
									hasNeededCoins = false;
								} else if (values.actualMutation[coin]) {
									newPouch[coin] = (newPouch[coin] || 0) - values.actualMutation[coin];
								}
							}
							performUpdate = hasNeededCoins;
						} else if (mutation === 'lose' && !hasExactChange) {
							for (const pouchKey in values.actualAmountPaying) {
								const coin: Coin = pouchKey as Coin;
								if (values.actualAmountPaying[coin]) {
									newPouch[coin] = (newPouch[coin] || 0) - values.actualAmountPaying[coin];
								}
							}
							for (const pouchKey in values.change) {
								const coin: Coin = pouchKey as Coin;
								if (values.change[coin]) {
									newPouch[coin] = (newPouch[coin] || 0) + values.change[coin];
								}
							}
							performUpdate = true;
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
						<Box py={2}>
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
									<Typography pt={2}>You have to have lost:</Typography>
								</>
							)}
							<ActualMutationForm />
							{!hasExactChange && (
								<>
									<Typography pt={2}>You don't have exact change. What will you pay with?</Typography>
									<ActualAmountPayingForm coinPouch={coinPouch} />
								</>
							)}
						</Box>
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
