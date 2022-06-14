import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormikErrors, FormikTouched, useFormikContext } from 'formik';

import { FlatPointsPool } from '../../types/BusinessRule';
import { CharacterClassTrait } from '../../types/CharacterClass';

function FlatPointsPoolRule() {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<CharacterClassTrait>();

	const rule = values.rule as FlatPointsPool;
	const ruleTouched = touched.rule as FormikTouched<FlatPointsPool>;
	const ruleErrors = errors.rule as FormikErrors<FlatPointsPool>;

	return (
		<>
			<Grid item xs={6}>
				<TextField
					id="rule.poolName"
					name="rule.poolName"
					label="Name"
					value={rule.poolName}
					onChange={handleChange}
					onBlur={handleBlur}
					error={ruleTouched?.poolName && Boolean(ruleErrors?.poolName)}
					helperText={ruleTouched?.poolName && ruleErrors?.poolName}
					required
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					id="rule.max"
					name="rule.max"
					label="Maximum"
					type="number"
					inputProps={{ min: 1 }}
					value={rule.max}
					onChange={handleChange}
					onBlur={handleBlur}
					error={ruleTouched?.max && Boolean(ruleErrors?.max)}
					helperText={ruleTouched?.max && ruleErrors?.max}
					required
				/>
			</Grid>
		</>
	);
}

export default FlatPointsPoolRule;
