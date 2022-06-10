import { useEffect, useRef } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Form, useFormikContext } from 'formik';

import { Mutation } from './MoneyPopup';

function MoneyPopupForm() {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<Mutation>();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current.focus();
	}, []);

	return (
		<Form id="moneyPopup">
			<Stack sx={{ m: 2 }} spacing={2}>
				<TextField
					inputRef={firstField}
					id="amount"
					name="amount"
					label="Amount"
					type="number"
					value={values.amount ?? ''}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.amount && Boolean(errors.amount)}
					helperText={touched.amount && errors.amount}
				/>
			</Stack>
		</Form>
	);
}

export default MoneyPopupForm;
