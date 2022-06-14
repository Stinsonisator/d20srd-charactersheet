import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormikErrors, FormikTouched, useFormikContext } from 'formik';

import { PowerPointsPool } from '../../types/BusinessRule';
import { CharacterClassTrait } from '../../types/CharacterClass';

function PowerPointsPoolRule() {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<CharacterClassTrait>();

	const rule = values.rule as PowerPointsPool;
	const ruleTouched = touched.rule as FormikTouched<PowerPointsPool>;
	const ruleErrors = errors.rule as FormikErrors<PowerPointsPool>;

	return (
		<>
			<Grid item xs={4}>
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
			<Grid item xs={4}>
				<TextField
					id="rule.base"
					name="rule.base"
					label="Base"
					type="number"
					inputProps={{ min: 1 }}
					value={rule.base}
					onChange={handleChange}
					onBlur={handleBlur}
					error={ruleTouched?.base && Boolean(ruleErrors?.base)}
					helperText={ruleTouched?.base && ruleErrors?.base}
					required
				/>
			</Grid>
			<Grid item xs={4}>
				<TextField
					id="rule.keyAbility"
					name="rule.keyAbility"
					label="Key ability"
					select
					value={rule.keyAbility}
					onChange={handleChange}
					onBlur={handleBlur}
					error={ruleTouched?.keyAbility && Boolean(ruleErrors?.keyAbility)}
					helperText={ruleTouched?.keyAbility && ruleErrors?.keyAbility}
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
		</>
	);
}

export default PowerPointsPoolRule;
