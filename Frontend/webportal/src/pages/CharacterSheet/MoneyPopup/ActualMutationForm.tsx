import { useRef } from 'react';

import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';

import { MoneyPopUpModel } from './MoneyPopup';

function ActualMutationForm() {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<MoneyPopUpModel>();
	const firstField = useRef<HTMLInputElement>();

	return (
		<Grid container columns={4} spacing={1}>
			<Grid item xs={1}>
				<TextField
					inputRef={firstField}
					id="actualMutation.copper"
					name="actualMutation.copper"
					label="Copper"
					type="number"
					value={values.actualMutation.copper ?? ''}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.actualMutation?.copper && Boolean(errors.actualMutation?.copper)}
					helperText={touched.actualMutation?.copper && errors.actualMutation?.copper}
				/>
			</Grid>
			<Grid item xs={1}>
				<TextField
					id="actualMutation.silver"
					name="actualMutation.silver"
					label="Silver"
					type="number"
					value={values.actualMutation.silver ?? ''}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.actualMutation?.silver && Boolean(errors.actualMutation?.silver)}
					helperText={touched.actualMutation?.silver && errors.actualMutation?.silver}
				/>
			</Grid>
			<Grid item xs={1}>
				<TextField
					id="actualMutation.gold"
					name="actualMutation.gold"
					label="Gold"
					type="number"
					value={values.actualMutation.gold ?? ''}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.actualMutation?.gold && Boolean(errors.actualMutation?.gold)}
					helperText={touched.actualMutation?.gold && errors.actualMutation?.gold}
				/>
			</Grid>
			<Grid item xs={1}>
				<TextField
					id="actualMutation.platinum"
					name="actualMutation.platinum"
					label="Platinum"
					type="number"
					value={values.actualMutation.platinum ?? ''}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.actualMutation?.platinum && Boolean(errors.actualMutation?.platinum)}
					helperText={touched.actualMutation?.platinum && errors.actualMutation?.platinum}
				/>
			</Grid>
		</Grid>
	);
}

export default ActualMutationForm;
