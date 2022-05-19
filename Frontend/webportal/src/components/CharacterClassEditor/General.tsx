import { useEffect, useRef } from 'react';

import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import remove from 'lodash/remove';
import some from 'lodash/some';

import { useGetSkillsQuery } from '../../services/api';
import { CharacterClass } from '../../types/CharacterClass';
import { Skill } from '../../types/Skill';

export default function General(): JSX.Element {
	const { values, touched, errors, handleChange, handleBlur, setFieldValue } = useFormikContext<CharacterClass>();
	const { data: skillData } = useGetSkillsQuery();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current?.focus();
	}, []);

	function onchangeSkillCheckBox(skill: Skill): void {
		const newCharacterClassSkills = [...values.classSkills];
		const removedSkills = remove(newCharacterClassSkills, { skillId: skill.id });
		if (removedSkills.length <= 0) {
			newCharacterClassSkills.push({ skillId: skill.id, characterClassId: values.id });
		}
		setFieldValue('classSkills', newCharacterClassSkills);
	}

	return (
		<Grid container sx={{ my: 2 }} spacing={2}>
			<Grid item xs={6}>
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
			</Grid>
			<Grid item xs={6}>
				<TextField
					inputRef={firstField}
					id="startingHp"
					name="startingHp"
					label="Starting HP"
					type="number"
					value={values.startingHp}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.startingHp && Boolean(errors.startingHp)}
					helperText={touched.startingHp && errors.startingHp}
					required
					autoFocus
				/>
			</Grid>
			{map(orderBy(skillData, 'name'), (skill) => (
				<Grid key={`skill_${skill.id}`} item xs={3}>
					<FormControlLabel label={skill.name} control={<Checkbox checked={some(values.classSkills, { skillId: skill.id })} onChange={() => onchangeSkillCheckBox(skill)} />} />
				</Grid>
			))}
		</Grid>
	);
}
