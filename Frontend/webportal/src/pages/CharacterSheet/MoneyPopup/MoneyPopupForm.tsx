import { useEffect, useRef } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Form, useFormikContext } from 'formik';

import { Money } from './MoneyPopup';

function MoneyPopupForm() {
	const { values, handleChange } = useFormikContext<Money>();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current.focus();
	}, []);

	return (
		<Form id="moneyPopup">
			<Stack sx={{ m: 2 }} spacing={2}>
				<TextField
					inputRef={firstField}
					inputProps={{ autoFocus: true }}
					id="copper"
					name="copper"
					label="Copper"
					type="number"
					value={values.copper ?? ''}
					onChange={handleChange}
					autoFocus
				/>
				<TextField id="silver" name="silver" label="Silver" type="number" value={values.silver ?? ''} onChange={handleChange} />
				<TextField id="gold" name="gold" label="Gold" type="number" value={values.gold ?? ''} onChange={handleChange} />
				<TextField id="platinum" name="platinum" label="Platinum" type="number" value={values.platinum ?? ''} onChange={handleChange} />
			</Stack>
		</Form>
	);
}

export default MoneyPopupForm;
