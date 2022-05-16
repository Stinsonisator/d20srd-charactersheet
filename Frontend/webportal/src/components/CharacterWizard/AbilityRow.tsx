import { Grid, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

import { Ability } from '../../types';
import { Character } from '../../types/Character';
import { displayModifier, getAbilityCode, getAbilityModifier, getFinalScore } from '../../utils';
import ReadOnlyField from '../ReadOnlyField';

interface Props {
	ability: Ability;
}

export function AbilityRow({ ability }: Props): JSX.Element {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<Character>();

	const finalScore = getFinalScore(values, ability);

	return (
		<>
			<Grid item xs={2}>
				<Typography>
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
				</Typography>
			</Grid>
			<Grid item xs={1}>
				<ReadOnlyField label="Modifier" value={displayModifier(getAbilityModifier(values[ability]))} />
			</Grid>
			<Grid item xs={1}>
				<ReadOnlyField label="Final score" value={finalScore.toString()} />
			</Grid>
			<Grid item xs={2}>
				<ReadOnlyField label="Final modifier" value={displayModifier(getAbilityModifier(finalScore))} />
			</Grid>
			<Grid item xs={6} />
		</>
	);
}
