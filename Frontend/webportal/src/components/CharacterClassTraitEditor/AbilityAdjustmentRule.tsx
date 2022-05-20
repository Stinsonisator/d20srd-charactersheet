import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { FormikErrors, FormikTouched, useFormikContext } from 'formik';

import { AbilityAdjustment } from '../../types/BusinessRule';
import { CharacterClassTrait } from '../../types/CharacterClass';

function AbilityAdjustmentRule() {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<CharacterClassTrait>();

	const rule = values.rule as AbilityAdjustment;
	const ruleTouched = touched.rule as FormikTouched<AbilityAdjustment>;
	const ruleErrors = errors.rule as FormikErrors<AbilityAdjustment>;

	return (
		<>
			<Grid item xs={6}>
				<TextField
					id="rule.ability"
					name="rule.ability"
					label="Ability"
					select
					value={rule.ability}
					onChange={handleChange}
					onBlur={handleBlur}
					error={ruleTouched?.ability && Boolean(ruleErrors?.ability)}
					helperText={ruleTouched?.ability && ruleErrors?.ability}
					required
				>
					<MenuItem value="strength">STR</MenuItem>
					<MenuItem value="dexterity">DEX</MenuItem>
					<MenuItem value="constitution">CON</MenuItem>
					<MenuItem value="intelligence">INT</MenuItem>
					<MenuItem value="wisdom">WIS</MenuItem>
					<MenuItem value="charisma">CHA</MenuItem>
				</TextField>
			</Grid>
			<Grid item xs={6}>
				<TextField
					id="rule.adjustment"
					name="rule.adjustment"
					label="Adjustment"
					type="number"
					value={rule.adjustment}
					onChange={handleChange}
					onBlur={handleBlur}
					error={ruleTouched?.adjustment && Boolean(ruleErrors?.adjustment)}
					helperText={ruleTouched?.adjustment && ruleErrors?.adjustment}
					required
				/>
			</Grid>
		</>
	);
}

export default AbilityAdjustmentRule;
