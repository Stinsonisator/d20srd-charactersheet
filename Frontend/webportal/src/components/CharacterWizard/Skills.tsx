import { useEffect } from 'react';

import { Grid, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import each from 'lodash/each';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import { useGetSkillsQuery } from '../../services/api';
import { Character } from '../../types/Character';
import CharacterSkillRow from './CharacterSkillRow';

function Skills() {
	const { values, setFieldValue } = useFormikContext<Character>();
	const { data, isLoading } = useGetSkillsQuery();

	useEffect(() => {
		if (!isLoading && data) {
			each(orderBy(data, 'name'), (skill, index) => {
				setFieldValue(`skills.${index}.skillId`, skill.id);
				setFieldValue(`skills.${index}.skill`, skill);
			});
		}
	}, [data, isLoading, setFieldValue]);

	return (
		<Grid sx={{ my: 4 }} container columnSpacing={1}>
			<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>Skill</Typography>
			</Grid>
			<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>Untrained</Typography>
			</Grid>
			<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>Total bonus</Typography>
			</Grid>
			<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>Ability bonus</Typography>
			</Grid>
			<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>Class skill</Typography>
			</Grid>
			<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography>Ranks</Typography>
			</Grid>
			{map(values.skills, (_characterSkill, index) => (
				<CharacterSkillRow index={index} />
			))}
		</Grid>
	);
}

export default Skills;
