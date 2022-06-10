import { Grid, Stack } from '@mui/material';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import CharacterSheetSectionHeader from '../../components/CharacterSheetSectionHeader';
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
			<CharacterSheetSectionHeader title="Skills" />
			{skills && (
				<Grid container spacing={1} columns={{ xs: 3, md: 4 }}>
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
