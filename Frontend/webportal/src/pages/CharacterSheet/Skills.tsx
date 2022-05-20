import { Box, Grid, Stack, Typography } from '@mui/material';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import { useGetSkillsQuery } from '../../services/api';
import { Character } from '../../types/Character';
import SkillCard from './SkillCard';

interface Props {
	character: Character;
}

function Skills({ character }: Props): JSX.Element {
	const { data: skills } = useGetSkillsQuery();

	return (
		<Stack spacing={2}>
			<Box py={1} display="flex" justifyContent="center" borderRadius={2} sx={(theme) => ({ backgroundColor: theme.palette.secondary.light })}>
				<Typography>Skills</Typography>
			</Box>
			{skills && (
				<Grid container spacing={1} columns={3}>
					{map(orderBy(skills, 'name'), (skill) => (
						<Grid key={`skill_${skill.name}`} item xs={1}>
							<SkillCard character={character} skill={skill} />
						</Grid>
					))}
				</Grid>
			)}
		</Stack>
	);
}

export default Skills;
