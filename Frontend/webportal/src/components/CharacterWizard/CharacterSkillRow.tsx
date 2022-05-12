import { useMemo } from 'react';

import { Checkbox, Grid, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

import { Character } from '../../types/Character';
import { displayModifier, getAbilityModifier, getFinalScore } from '../../utils';

interface Props {
	index: number;
}

function CharacterSkillRow({ index }: Props): JSX.Element {
	const { values, handleChange, setFieldValue } = useFormikContext<Character>();

	const skill = useMemo(() => values.skills[index].skill, [index, values.skills]);

	const abilityModifier = useMemo(() => {
		let abilityScore: number;

		switch (skill.keyAbility) {
			case 'str':
				abilityScore = values.strength;
				break;
			case 'dex':
				abilityScore = values.dexterity;
				break;
			case 'con':
				abilityScore = values.constitution;
				break;
			case 'int':
				abilityScore = values.intelligence;
				break;
			case 'wis':
				abilityScore = values.wisdom;
				break;
			case 'cha':
				abilityScore = values.charisma;
				break;
		}
		return getAbilityModifier(getFinalScore(values.characterClass, skill.keyAbility, abilityScore));
	}, [skill.keyAbility, values.characterClass, values.charisma, values.constitution, values.dexterity, values.intelligence, values.strength, values.wisdom]);

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
				<Checkbox checked={values.skills[index].countAsClassSkill} onChange={(_event, checked) => setFieldValue(`skills.${index}.countAsClassSkill`, checked)} />
			</Grid>
			<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
				<TextField id={`skills.${index}.points`} name={`skills.${index}.points`} type="number" value={values.skills[index].points} onChange={handleChange} />
			</Grid>
		</>
	);
}

export default CharacterSkillRow;
