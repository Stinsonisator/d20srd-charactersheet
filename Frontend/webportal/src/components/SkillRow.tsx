import { ChangeEvent, useMemo } from 'react';

import { Checkbox, Grid, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import find from 'lodash/find';
import some from 'lodash/some';

import { Character } from '../types/Character';
import { Skill } from '../types/Skill';
import { displayModifier, getAbilityCode, getAbilityModifierForCharacter } from '../utils';

interface Props {
	skill: Skill;
}

function CharacterSkillRow({ skill }: Props): JSX.Element {
	const { values, setFieldValue } = useFormikContext<Character>();

	const classSkill = useMemo(() => some(values.characterClass.classSkills, { skillId: skill.id }), [skill.id, values.characterClass.classSkills]);

	const abilityModifier = useMemo(() => {
		return getAbilityModifierForCharacter(values, skill.keyAbility);
	}, [skill.keyAbility, values]);

	const characterSkill = useMemo(() => find(values.skills, { skillId: skill.id }), [skill.id, values.skills]);

	const skillModifier = useMemo(() => {
		if (classSkill || characterSkill?.countAsClassSkill) {
			return characterSkill?.points || 0;
		}
		return Math.floor((characterSkill?.points || 0) / 2);
	}, [classSkill, characterSkill?.countAsClassSkill, characterSkill?.points]);

	function onChangeCountAsClassSkill(checked: boolean) {
		if (characterSkill) {
			setFieldValue(`skills.${values.skills.indexOf(characterSkill)}.countAsClassSkill`, checked);
		} else {
			setFieldValue(`skills.${values.skills.length}`, {
				characterId: values.id,
				skillId: skill.id,
				points: 0,
				countAsClassSkill: checked
			});
		}
	}

	function onChangePoints(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (characterSkill) {
			setFieldValue(`skills.${values.skills.indexOf(characterSkill)}.points`, parseInt(event.target.value));
		} else {
			setFieldValue(`skills.${values.skills.length}`, {
				characterId: values.id,
				skillId: skill.id,
				points: parseInt(event.target.value),
				countAsClassSkill: false
			});
		}
	}

	return (
		<>
			<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>{skill.name}</Typography>
			</Grid>
			<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>{getAbilityCode(skill.keyAbility)}</Typography>
			</Grid>
			<Grid item xs={1}>
				<Checkbox checked={skill.untrained} />
			</Grid>
			<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>{skill.untrained || characterSkill?.points ? displayModifier(abilityModifier + skillModifier) : '/'}</Typography>
			</Grid>
			<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>{displayModifier(abilityModifier)}</Typography>
			</Grid>
			<Grid item xs={1}>
				<Checkbox
					checked={classSkill || characterSkill?.countAsClassSkill || false}
					disabled={classSkill}
					onChange={(_event, checked) => onChangeCountAsClassSkill(checked)}
				/>
			</Grid>
			<Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
				<TextField type="number" value={characterSkill?.points || null} onChange={onChangePoints} />
			</Grid>
		</>
	);
}

export default CharacterSkillRow;
