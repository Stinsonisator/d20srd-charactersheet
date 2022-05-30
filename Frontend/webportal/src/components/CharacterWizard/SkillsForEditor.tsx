import { Grid, Typography } from '@mui/material';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import { useGetSkillsQuery } from '../../services/api';
import { Character } from '../../types/Character';
import CharacterSkillRowForEditor from './CharacterSkillRowForEditor';

interface Props {
	character: Character;
}

function SkillsForEditor({ character }: Props) {
	const { data } = useGetSkillsQuery();

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
			{map(orderBy(data, 'name'), (skill) => (
				<CharacterSkillRowForEditor character={character} skill={skill} />
			))}
		</Grid>
	);
}

export default SkillsForEditor;
