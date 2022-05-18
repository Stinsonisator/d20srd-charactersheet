import { useMemo } from 'react';

import { Checkbox, Grid, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

import { Character } from '../../types/Character';
import { displayModifier, getAbilityModifier, getFinalScore } from '../../utils';
import some from 'lodash/some';

interface Props {
	index: number;
}

function CharacterSkillRow({ index }: Props): JSX.Element {
	const { values, handleChange, setFieldValue } = useFormikContext<Character>();

	const skill = useMemo(() => values.skills[index].skill, [index, values.skills]);

	const classSkill = useMemo(() => some(values.characterClass.classSkills, { skillId: skill.id }), [skill.id, values.characterClass.classSkills]);

	const abilityModifier = useMemo(() => {
		return getAbilityModifier(getFinalScore(values, skill.keyAbility));
	}, [skill.keyAbility, values]);

	const countAsClassSkill = values.skills[index].countAsClassSkill;
	const points = values.skills[index].points;

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
					checked={classSkill || values.skills[index].countAsClassSkill}
					disabled={classSkill}
					onChange={(_event, checked) => setFieldValue(`skills.${index}.countAsClassSkill`, checked)}
				/>
			</Grid>
			<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
				<TextField id={`skills.${index}.points`} name={`skills.${index}.points`} type="number" value={values.skills[index].points} onChange={handleChange} />
			</Grid>
		</>
	);
}

export default CharacterSkillRow;
