import { Grid, TextField } from '@mui/material';
import { useFormikContext } from 'formik';

import { Ability } from '../types/Ability';
import { Character } from '../types/Character';
import { displayModifier, getAbilityCode, getAbilityModifier, getAbilityScore } from '../utils';
import ReadOnlyField from './ReadOnlyField';

interface Props {
	ability: Ability;
}

export function AbilityRow({ ability }: Props): JSX.Element {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<Character>();

	return (
		<>
			<Grid item xs={2}>
				<TextField
					id={ability}
					name={ability}
					label={getAbilityCode(ability)}
					type="number"
					inputProps={{ min: 8, max: 18 }}
					value={values[ability]}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched[ability] && Boolean(errors[ability])}
					helperText={touched[ability] && errors[ability]}
					required
				/>
			</Grid>
			<Grid item xs={2}>
				<ReadOnlyField label="Final score" value={getAbilityScore(values, ability).toString()} />
			</Grid>
			<Grid item xs={2}>
				<ReadOnlyField label="Modifier" value={displayModifier(getAbilityModifier(values, ability))} />
			</Grid>
			<Grid item xs={6} />
		</>
	);
}
