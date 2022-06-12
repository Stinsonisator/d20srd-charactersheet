import { useEffect } from 'react';

import { Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';

import { CoinPouch, Mutation } from '../../../types/Money';
import { MoneyPopUpModel } from './MoneyPopup';

function addChangeCoins(remainingCopper: number, coinValue: number, changeMutation: Mutation, coinName: keyof Mutation) {
	while (remainingCopper >= coinValue) {
		remainingCopper -= coinValue;
		changeMutation[coinName] += 1;
	}
	return remainingCopper;
}

interface Props {
	coinPouch: CoinPouch;
}

function ActualAmountPayingForm({ coinPouch }: Props) {
	const { values, touched, errors, handleChange, handleBlur, setFieldValue } = useFormikContext<MoneyPopUpModel>();

	useEffect(() => {
		const totalToPay =
			(values.actualMutation.copper || 0) +
			(values.actualMutation.silver || 0) * 10 +
			(values.actualMutation.gold || 0) * 100 +
			(values.actualMutation.platinum || 0) * 1000;
		const totalPaying =
			(values.actualAmountPaying.copper || 0) +
			(values.actualAmountPaying.silver || 0) * 10 +
			(values.actualAmountPaying.gold || 0) * 100 +
			(values.actualAmountPaying.platinum || 0) * 1000;
		const changeMutation: Mutation = {
			copper: 0,
			silver: 0,
			gold: 0,
			platinum: 0
		};
		if (totalToPay < totalPaying) {
			let remainingCopper = totalPaying - totalToPay;

			remainingCopper = addChangeCoins(remainingCopper, 1000, changeMutation, 'platinum');
			remainingCopper = addChangeCoins(remainingCopper, 100, changeMutation, 'gold');
			remainingCopper = addChangeCoins(remainingCopper, 10, changeMutation, 'silver');
			addChangeCoins(remainingCopper, 1, changeMutation, 'copper');
		}
		setFieldValue('change', changeMutation, true);
	}, [
		setFieldValue,
		values.actualAmountPaying.copper,
		values.actualAmountPaying.gold,
		values.actualAmountPaying.platinum,
		values.actualAmountPaying.silver,
		values.actualMutation.copper,
		values.actualMutation.gold,
		values.actualMutation.platinum,
		values.actualMutation.silver
	]);

	return (
		<Grid container columns={4} spacing={1}>
			<Grid item xs={1}>
				{coinPouch.copper && (
					<TextField
						id="actualAmountPaying.copper"
						name="actualAmountPaying.copper"
						label="Copper"
						type="number"
						value={values.actualAmountPaying.copper ?? ''}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.actualAmountPaying?.copper && Boolean(errors.actualAmountPaying?.copper)}
						helperText={touched.actualAmountPaying?.copper && errors.actualAmountPaying?.copper}
					/>
				)}
			</Grid>
			<Grid item xs={1}>
				{coinPouch.silver && (
					<TextField
						id="actualAmountPaying.silver"
						name="actualAmountPaying.silver"
						label="Silver"
						type="number"
						value={values.actualAmountPaying.silver ?? ''}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.actualAmountPaying?.silver && Boolean(errors.actualAmountPaying?.silver)}
						helperText={touched.actualAmountPaying?.silver && errors.actualAmountPaying?.silver}
					/>
				)}
			</Grid>
			<Grid item xs={1}>
				{coinPouch.gold && (
					<TextField
						id="actualAmountPaying.gold"
						name="actualAmountPaying.gold"
						label="Gold"
						type="number"
						inputProps={{ min: 0, max: coinPouch.gold }}
						value={values.actualAmountPaying.gold ?? ''}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.actualAmountPaying?.gold && Boolean(errors.actualAmountPaying?.gold)}
						helperText={touched.actualAmountPaying?.gold && errors.actualAmountPaying?.gold}
					/>
				)}
			</Grid>
			<Grid item xs={1}>
				{coinPouch.platinum && (
					<TextField
						id="actualAmountPaying.platinum"
						name="actualAmountPaying.platinum"
						label="Platinum"
						type="number"
						inputProps={{ min: 0, max: coinPouch.platinum }}
						value={values.actualAmountPaying.platinum ?? ''}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.actualAmountPaying?.platinum && Boolean(errors.actualAmountPaying?.platinum)}
						helperText={touched.actualAmountPaying?.platinum && errors.actualAmountPaying?.platinum}
					/>
				)}
			</Grid>
			<Grid item xs={4}>
				<Typography pt={1}>You'll receive the following change:</Typography>
			</Grid>
			<Grid item xs={1}>
				<Typography textAlign="center">{values.change?.copper || 0} cp</Typography>
			</Grid>
			<Grid item xs={1}>
				<Typography textAlign="center">{values.change?.silver || 0} sp</Typography>
			</Grid>
			<Grid item xs={1} textAlign="center">
				<Typography>{values.change?.gold || 0} gp</Typography>
			</Grid>
			<Grid item xs={1} textAlign="center">
				<Typography>{values.change?.platinum || 0} pp</Typography>
			</Grid>
			{errors.change?.copper && (
				<Grid item xs={4}>
					<Typography pt={1} color="error">
						{errors.change?.copper}
					</Typography>
				</Grid>
			)}
		</Grid>
	);
}

export default ActualAmountPayingForm;
