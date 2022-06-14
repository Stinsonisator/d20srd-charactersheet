import { useState } from 'react';

import { FormControlLabel, Grid, Stack, Switch } from '@mui/material';
import filter from 'lodash/filter';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import CharacterSheetSectionHeader from '../../components/CharacterSheetSectionHeader';
import { CharacterSheetData } from '../../types/CharacterSheetData';
import SkillCard from './SkillCard';

interface Props {
	character: CharacterSheetData;
}

function Skills({ character }: Props): JSX.Element {
	const [showUntrained, setShowUntrained] = useState(false);

	return (
		<Stack spacing={2}>
			<CharacterSheetSectionHeader
				title="Skills"
				rightElement={
					<FormControlLabel
						control={
							<Switch
								color="success"
								size="small"
								checked={showUntrained}
								onChange={(event) => setShowUntrained(event.target.checked)}
							/>
						}
						label="Show untrained"
					/>
				}
			/>
			<Grid container spacing={1} columns={{ xs: 3, md: 4 }}>
				{map(
					orderBy(
						filter(character.skills, (skill) => showUntrained || skill.modifier.value !== null),
						'name'
					),
					(skill) => (
						<Grid key={`skill_${skill.name}`} item xs={1}>
							<SkillCard skill={skill} />
						</Grid>
					)
				)}
			</Grid>
		</Stack>
	);
}

export default Skills;
