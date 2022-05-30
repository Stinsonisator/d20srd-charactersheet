import { useMemo } from 'react';

import { Checkbox, Grid, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import findIndex from 'lodash/findIndex';
import some from 'lodash/some';

import { Character } from '../../types/Character';
import { Skill } from '../../types/Skill';
import { displayModifier, getAbilityModifier } from '../../utils';

interface Props {
	character: Character;
	skill: Skill;
}

function CharacterSkillRowForEditor({ character, skill }: Props): JSX.Element {
	const { values, handleChange, setFieldValue } = useFormikContext<Character>();

	const index = useMemo(() => findIndex(values.skills, { skillId: skill.id }), [skill.id, values.skills]);
	const characterSkill = useMemo(() => values.skills[index], [index, values.skills]);
	const classSkill = useMemo(() => some(values.characterClass.classSkills, { skillId: skill.id }), [skill.id, values.characterClass.classSkills]);

	const abilityModifier = useMemo(() => {
		return getAbilityModifier(values, skill.keyAbility);
	}, [skill.keyAbility, values]);

	const countAsClassSkill = characterSkill?.countAsClassSkill;
	const points = characterSkill?.points;

	const skillModifier = useMemo(() => {
		if (countAsClassSkill) {
			return points ?? 0;
		}
		return Math.floor((points ?? 0) / 2);
	}, [countAsClassSkill, points]);

	return (
		<>
			<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>{skill.name}</Typography>
			</Grid>
			<Grid item xs={1}>
				<Checkbox checked={skill.untrained} />
			</Grid>
			<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>{displayModifier(abilityModifier + skillModifier)}</Typography>
			</Grid>
			<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>{displayModifier(abilityModifier)}</Typography>
			</Grid>
			<Grid item xs={1}>
				<Checkbox
					checked={classSkill || characterSkill?.countAsClassSkill}
					disabled={classSkill}
					onChange={(_event, checked) => {
						if (!characterSkill) {
							setFieldValue(`skills`, [
								...values.skills,
								{
									id: 0,
									characterId: character.id,
									skillId: skill.id,
									skill,
									points: null,
									countAsClassSkill: false
								}
							]);
						} else {
							setFieldValue(`skills.${index}.countAsClassSkill`, checked);
						}
					}}
				/>
			</Grid>
			<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
				<TextField
					id={`skills.${index}.points`}
					name={`skills.${index}.points`}
					type="number"
					value={characterSkill?.points}
					onChange={(event) => {
						if (!characterSkill) {
							setFieldValue('skills', [
								...values.skills,
								{
									id: 0,
									characterId: character.id,
									skillId: skill.id,
									skill,
									points: event.target.value,
									countAsClassSkill: false
								}
							]);
						} else {
							handleChange(event);
						}
					}}
				/>
			</Grid>
		</>
	);
}

export default CharacterSkillRowForEditor;
