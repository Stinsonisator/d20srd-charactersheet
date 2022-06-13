import { Grid, Typography } from '@mui/material';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import { useGetSkillsQuery } from '../services/api';
import Loader from './Loader';
import SkillRow from './SkillRow';

function Skills() {
	const { data, isLoading } = useGetSkillsQuery();

	return (
		<>
			{isLoading && <Loader />}
			<Grid sx={{ my: 4 }} container columnSpacing={1}>
				<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography>Skill</Typography>
				</Grid>
				<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography>Ability</Typography>
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
				<Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography>Ranks</Typography>
				</Grid>
				{map(orderBy(data, 'name'), (skill) => (
					<SkillRow key={`skill_${skill.id}`} skill={skill} />
				))}
			</Grid>
		</>
	);
}

export default Skills;
