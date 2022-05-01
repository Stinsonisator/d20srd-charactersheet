import { useEffect, useRef } from 'react';

import { Grid, MenuItem, TextField } from '@mui/material';
import { useFormikContext } from 'formik';

import { Character } from '../../types/Character';

export default function Attributes(): JSX.Element {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<Character>();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current?.focus();
	}, []);

	return (
		<Grid container spacing={2}>
			<Grid item xs={8}>
				<TextField
					inputRef={firstField}
					id="name"
					name="name"
					label="Name"
					inputProps={{ maxLength: 4 }}
					value={values.name}
					onChange={(event) => {
						event.target.value = event.target.value.toUpperCase();
						handleChange(event);
					}}
					onBlur={handleBlur}
					error={touched.name && Boolean(errors.name)}
					helperText={touched.name && errors.name}
					required
					autoFocus
				/>
			</Grid>
			<Grid item xs={2}>
				<TextField
					id="age"
					name="age"
					label="Age"
					type="number"
					inputProps={{ min: 21, max: 26 }}
					value={values.age}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.age && Boolean(errors.age)}
					helperText={touched.age && errors.age}
					required
				/>
			</Grid>
			<Grid item xs={2}>
				<TextField
					id="gender"
					name="gender"
					label="Gender"
					select
					value={values.gender}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.gender && Boolean(errors.gender)}
					helperText={touched.gender && errors.gender}
					required
				>
					<MenuItem value="m">M</MenuItem>
					<MenuItem value="v">V</MenuItem>
					<MenuItem value="x">X</MenuItem>
				</TextField>
			</Grid>
			<Grid item xs={3}>
				<TextField
					id="race"
					name="race"
					label="Race"
					select
					value={values.race}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.race && Boolean(errors.race)}
					helperText={touched.race && errors.race}
					required
				>
					<MenuItem value="human">Human</MenuItem>
					<MenuItem value="halfElf">Half elf</MenuItem>
					<MenuItem value="halfling">Halfling</MenuItem>
				</TextField>
			</Grid>
			<Grid item xs={5}>
				<TextField
					id="characterClass"
					name="characterClass"
					label="Class"
					select
					value={values.characterClass}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.characterClass && Boolean(errors.characterClass)}
					helperText={touched.characterClass && errors.characterClass}
					required
				>
					<MenuItem value="blackBelt">Black Belt</MenuItem>
				</TextField>
			</Grid>
			<Grid item xs={2}>
				<TextField
					id="size.feet"
					name="size.feet"
					label="Size (ft)"
					type="number"
					inputProps={{ min: 0 }}
					value={values.size.feet}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.size?.feet && Boolean(errors.size?.feet)}
					helperText={touched.size?.feet && errors.size?.feet}
					required
				/>
			</Grid>
			<Grid item xs={2}>
				<TextField
					id="size.inch"
					name="size.inch"
					label="Size (in)"
					type="number"
					inputProps={{ min: 0 }}
					value={values.size.inch}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.size?.inch && Boolean(errors.size?.inch)}
					helperText={touched.size?.inch && errors.size?.inch}
					required
				/>
			</Grid>
		</Grid>
	);
}
