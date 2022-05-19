import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';

import { CharacterClassTrait } from '../../types/CharacterClass';

function AbilityAdjustmentRule() {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<CharacterClassTrait>();

	return (
		<>
			<Grid item xs={6}>
				<TextField
					id="rule.ability"
					name="rule.ability"
					label="Ability"
					select
					value={values.rule.ability}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.rule?.ability && Boolean(errors.rule?.ability)}
					helperText={touched.rule?.ability && errors.rule?.ability}
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
					value={values.rule.adjustment}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.rule?.adjustment && Boolean(errors.rule?.adjustment)}
					helperText={touched.rule?.adjustment && errors.rule?.adjustment}
					required
				/>
			</Grid>
		</>
	);
}

export default AbilityAdjustmentRule;
