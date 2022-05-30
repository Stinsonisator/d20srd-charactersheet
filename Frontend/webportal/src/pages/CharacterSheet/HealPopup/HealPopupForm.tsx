import { useEffect, useRef } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Form, useFormikContext } from 'formik';

import { Heal } from './HealPopup';

function HealPopupForm() {
	const { values, errors, touched, handleChange, handleBlur } = useFormikContext<Heal>();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current.focus();
	}, []);

	return (
		<Form id="healPopup">
			<Stack sx={{ m: 2 }} spacing={2}>
				<TextField
					inputRef={firstField}
					inputProps={{ autoFocus: true }}
					id="amount"
					name="amount"
					label="Heal amount"
					type="number"
					value={values.amount ?? ''}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.amount && Boolean(errors.amount)}
					helperText={touched.amount && errors.amount}
					autoFocus
				/>
			</Stack>
		</Form>
	);
}

export default HealPopupForm;
