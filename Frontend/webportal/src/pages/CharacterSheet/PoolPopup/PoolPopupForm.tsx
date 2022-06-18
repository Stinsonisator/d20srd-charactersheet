import { useEffect, useRef } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Form, useFormikContext } from 'formik';

import { UsedPoints } from './PoolPopup';

function PoolPopupForm() {
	const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext<UsedPoints>();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current.focus();
	}, []);

	return (
		<Form id="poolPopup">
			<Stack sx={{ mt: 1 }} spacing={2} justifyContent="center" direction="row">
				<ToggleButtonGroup
					value={values.mutation}
					exclusive
					onChange={(_event, value) => setFieldValue('mutation', value)}
					orientation="vertical"
				>
					<ToggleButton value="decrease" color="error" sx={{ height: '30px' }}>
						-
					</ToggleButton>
					<ToggleButton value="increase" color="success" sx={{ height: '30px' }}>
						+
					</ToggleButton>
				</ToggleButtonGroup>
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

export default PoolPopupForm;
