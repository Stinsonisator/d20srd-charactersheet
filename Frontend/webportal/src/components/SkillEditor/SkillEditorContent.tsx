import { useEffect, useRef } from 'react';

import { FormControlLabel, MenuItem, Stack, Switch, TextField } from '@mui/material';
import { useFormikContext } from 'formik';

import { Skill } from '../../types/Skill';

function SkillEditorContent() {
	const { values, errors, touched, handleChange, handleBlur } = useFormikContext<Skill>();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current?.focus();
	}, []);

	return (
		<Stack sx={{ m: 2 }} spacing={2}>
			<TextField
				inputRef={firstField}
				id="name"
				name="name"
				label="Name"
				value={values.name}
				onChange={handleChange}
				onBlur={handleBlur}
				error={touched.name && Boolean(errors.name)}
				helperText={touched.name && errors.name}
				required
				autoFocus
			/>
			<TextField
				id="keyAbility"
				name="keyAbility"
				label="Key ability"
				select
				value={values.keyAbility}
				onChange={handleChange}
				onBlur={handleBlur}
				error={touched.keyAbility && Boolean(errors.keyAbility)}
				helperText={touched.keyAbility && errors.keyAbility}
				required
			>
				<MenuItem value="strength">STR</MenuItem>
				<MenuItem value="dexterity">DEX</MenuItem>
				<MenuItem value="constitution">CON</MenuItem>
				<MenuItem value="intelligence">INT</MenuItem>
				<MenuItem value="wisdom">WIS</MenuItem>
				<MenuItem value="charisma">CHA</MenuItem>
			</TextField>
			<FormControlLabel
				control={<Switch color="primary" id="untrained" name="untrained" checked={values.untrained} onChange={handleChange} />}
				label="Untrained"
				labelPlacement="top"
				sx={{ alignItems: 'flex-start' }}
			/>
		</Stack>
	);
}

export default SkillEditorContent;
