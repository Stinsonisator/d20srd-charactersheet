import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormikErrors, FormikTouched, useFormikContext } from 'formik';

import { SavingThrowModifiers } from '../../types/BusinessRule';
import { CharacterClassTrait } from '../../types/CharacterClass';

function SavingThrowModifiersRule() {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<CharacterClassTrait>();

	const rule = values.rule as SavingThrowModifiers;
	const ruleTouched = touched.rule as FormikTouched<SavingThrowModifiers>;
	const ruleErrors = errors.rule as FormikErrors<SavingThrowModifiers>;

	return (
		<>
			<Grid item xs={4}>
				<TextField
					id="rule.fortitude"
					name="rule.fortitude"
					label="Fortitude"
					type="number"
					value={rule.fortitude}
					onChange={handleChange}
					onBlur={handleBlur}
					error={ruleTouched?.fortitude && Boolean(ruleErrors?.fortitude)}
					helperText={ruleTouched?.fortitude && ruleErrors?.fortitude}
					required
				/>
			</Grid>
			<Grid item xs={4}>
				<TextField
					id="rule.reflex"
					name="rule.reflex"
					label="Reflex"
					type="number"
					value={rule.reflex}
					onChange={handleChange}
					onBlur={handleBlur}
					error={ruleTouched?.reflex && Boolean(ruleErrors?.reflex)}
					helperText={ruleTouched?.reflex && ruleErrors?.reflex}
					required
				/>
			</Grid>
			<Grid item xs={4}>
				<TextField
					id="rule.will"
					name="rule.will"
					label="Will"
					type="number"
					value={rule.will}
					onChange={handleChange}
					onBlur={handleBlur}
					error={ruleTouched?.will && Boolean(ruleErrors?.will)}
					helperText={ruleTouched?.will && ruleErrors?.will}
					required
				/>
			</Grid>
		</>
	);
}

export default SavingThrowModifiersRule;
