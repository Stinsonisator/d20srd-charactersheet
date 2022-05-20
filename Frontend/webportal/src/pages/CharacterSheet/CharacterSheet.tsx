import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Alert, Avatar, Box, CircularProgress, GlobalStyles, Tab, Tabs, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import sumBy from 'lodash/sumBy';

import { useGetCharacterQuery, useGetSkillsQuery } from '../../services/api';
import { getAbilityModifier } from '../../utils';
import Abilities from './Abilities';
import Saves from './Saves';
import Skills from './Skills';

const globalStyles = (
	<GlobalStyles
		styles={(theme) => ({
			'.MuiInput-input': {
				'&.Mui-disabled': {
					WebkitTextFillColor: `${theme.palette.text.primary} !important`
				}
			}
		})}
	/>
);

export function CharacterSheet(): JSX.Element {
	const { id } = useParams();
	const [currentTab, setCurrentTab] = useState(0);
	const { data: character, error: characterError, isLoading: characterIsLoading } = useGetCharacterQuery(id ? parseInt(id) : -1, { skip: !Boolean(id) });
	const { error: skillsError, isLoading: areSkillsLoading } = useGetSkillsQuery();

	return (
		<>
			{globalStyles}
			{(characterIsLoading || areSkillsLoading) && (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			)}
			{characterError && <Alert severity="error">An error happened fetching the character.</Alert>}
			{skillsError && <Alert severity="error">An error happened fetching the skills.</Alert>}
			{character && (
				<Stack spacing={1} sx={{ my: 1 }}>
					<Grid container spacing={2} sx={(theme) => ({ backgroundColor: theme.palette.secondary.light, pb: 2, borderRadius: 2, color: theme.palette.secondary.contrastText })}>
						<Grid item xs={1}>
							<Avatar src="https://ih1.redbubble.net/image.846676006.1552/st,small,845x845-pad,1000x1000,f8f8f8.u3.jpg" />
						</Grid>
						<Grid item xs={1} display="flex" alignItems="center">
							<Typography fontSize={25} fontWeight="bold">
								{character.name}
							</Typography>
						</Grid>
						<Grid item xs={2} display="flex" alignItems="center">
							<Typography fontSize={25}>Max HP: {sumBy(character.levels, 'hp') + getAbilityModifier(character, 'constitution') * character.levels.length}</Typography>
						</Grid>
					</Grid>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={currentTab} onChange={(_event, newValue) => setCurrentTab(newValue)}>
							<Tab label="Abilities, saves & skills" />
							<Tab label="Combat stats" />
						</Tabs>
					</Box>
					<Box py={1}>
						{
							{
								0: (
									<Grid container spacing={2} columns={4}>
										<Grid item xs={4}>
											<Abilities character={character} />
										</Grid>
										<Grid item xs={1}>
											<Saves character={character} />
										</Grid>
										<Grid item xs>
											<Skills character={character} />
										</Grid>
									</Grid>
								)
							}[currentTab]
						}
					</Box>
				</Stack>
			)}
		</>
	);
}
