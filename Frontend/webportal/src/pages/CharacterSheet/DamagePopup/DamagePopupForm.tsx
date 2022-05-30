import { useEffect, useRef } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Form, useFormikContext } from 'formik';

import { Damage } from './DamagePopup';

function DamagePopupForm() {
	const { values, errors, touched, handleChange, handleBlur } = useFormikContext<Damage>();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current.focus();
	}, []);

	return (
		<Form id="damagePopup">
			<Stack sx={{ m: 2 }} spacing={2}>
				<TextField
					inputRef={firstField}
					inputProps={{ autoFocus: true }}
					id="lethalDamage"
					name="lethalDamage"
					label="LethalDamage"
					type="number"
					value={values.lethalDamage ?? ''}
					onChange={handleChange}
					onBlur={handleBlur}
					error={(touched.lethalDamage || touched.nonlethalDamage) && Boolean(errors.lethalDamage)}
					helperText={(touched.lethalDamage || touched.nonlethalDamage) && errors.lethalDamage}
					autoFocus
				/>
				<TextField
					id="nonlethalDamage"
					name="nonlethalDamage"
					label="Nonlethal damage"
					type="number"
					value={values.nonlethalDamage ?? ''}
					onChange={handleChange}
					onBlur={handleBlur}
					error={(touched.nonlethalDamage || touched.lethalDamage) && Boolean(errors.nonlethalDamage)}
					helperText={(touched.nonlethalDamage || touched.lethalDamage) && errors.nonlethalDamage}
				/>
			</Stack>
		</Form>
	);
}

export default DamagePopupForm;
