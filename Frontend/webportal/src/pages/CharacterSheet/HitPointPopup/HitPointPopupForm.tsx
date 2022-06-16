import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useFormikContext } from 'formik';

import { HitpointsMutation } from './HitPointPopup';

function HitPointPopupForm() {
	const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext<HitpointsMutation>();

	return (
		<Stack m={2} spacing={1} alignItems="center">
			<ToggleButtonGroup value={values.mutation} exclusive onChange={(event, value) => setFieldValue('mutation', value)} sx={{ mb: 1 }}>
				<ToggleButton value="damage" color="error">
					Damage
				</ToggleButton>
				<ToggleButton value="heal" color="success">
					Heal
				</ToggleButton>
			</ToggleButtonGroup>
			<TextField
				id="lethalDamage"
				name="lethalDamage"
				label="Lethal damage"
				type="number"
				value={values.lethalDamage ?? ''}
				onChange={handleChange}
				onBlur={handleBlur}
				error={(touched.lethalDamage || touched.nonlethalDamage) && Boolean(errors.lethalDamage)}
				helperText={(touched.lethalDamage || touched.nonlethalDamage) && errors.lethalDamage}
			/>
			{(values.mutation === 'damage' || !values.lethalDamage) && (
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
			)}
		</Stack>
	);
}

export default HitPointPopupForm;
