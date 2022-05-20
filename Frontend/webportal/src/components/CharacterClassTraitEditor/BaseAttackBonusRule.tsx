import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormikErrors, FormikTouched, useFormikContext } from 'formik';

import { BaseAttackBonus } from '../../types/BusinessRule';
import { CharacterClassTrait } from '../../types/CharacterClass';

function BaseAttackBonusRule() {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<CharacterClassTrait>();

	const rule = values.rule as BaseAttackBonus;
	const ruleTouched = touched.rule as FormikTouched<BaseAttackBonus>;
	const ruleErrors = errors.rule as FormikErrors<BaseAttackBonus>;

	return (
		<>
			<Grid item xs={12}>
				<TextField
					id="rule.baseAttackBonus"
					name="rule.baseAttackBonus"
					label="Base attach bonus"
					type="number"
					value={rule.baseAttackBonus}
					onChange={handleChange}
					onBlur={handleBlur}
					error={ruleTouched?.baseAttackBonus && Boolean(ruleErrors?.baseAttackBonus)}
					helperText={ruleTouched?.baseAttackBonus && ruleErrors?.baseAttackBonus}
					required
				/>
			</Grid>
		</>
	);
}

export default BaseAttackBonusRule;
