import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Alert, Avatar, Box, CircularProgress, GlobalStyles, Tab, Tabs, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import find from 'lodash/find';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import sumBy from 'lodash/sumBy';

import ReadOnlyField from '../../components/ReadOnlyField';
import { useGetCharacterQuery, useGetSkillsQuery } from '../../services/api';
import { displayModifier, getAbilityModifier, getFinalScore } from '../../utils';
import { AbilityRow } from './AbilityRow';
import CharacterSkillRow from './CharacterSkillRow';
import SectionHeader from './SectionHeader';
import AbilityCard from './AbilityCard';

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
	const { data: skills, error: skillsError, isLoading: areSkillsLoading } = useGetSkillsQuery();

	return (
		<>
			{globalStyles}
			{characterIsLoading && (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			)}
			{characterError && <Alert severity="error">An error happened fetching the character.</Alert>}
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
							<Tab label="Abilities & skills" />
							<Tab label="Combat stats" />
						</Tabs>
					</Box>
					<Box overflow="auto">
						{
							{
								0: (
									<Grid container spacing={2} justifyContent="space-around">
										<Grid item xs={2} display="flex" justifyContent="center">
											<AbilityCard character={character} ability="strength" />
										</Grid>
										<Grid item xs={2} display="flex" justifyContent="center">
											<AbilityCard character={character} ability="dexterity" />
										</Grid>
										<Grid item xs={2} display="flex" justifyContent="center">
											<AbilityCard character={character} ability="constitution" />
										</Grid>
										<Grid item xs={2} display="flex" justifyContent="center">
											<AbilityCard character={character} ability="intelligence" />
										</Grid>
										<Grid item xs={2} display="flex" justifyContent="center">
											<AbilityCard character={character} ability="wisdom" />
										</Grid>
										<Grid item xs={2} display="flex" justifyContent="center">
											<AbilityCard character={character} ability="charisma" />
										</Grid>
									</Grid>
								)
							}[currentTab]
						}
					</Box>
				</Stack>
				// <Grid container spacing={2} columns={3}>
				// 	<Grid item xs={1}>
				// 		<Stack>
				// 			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				// 				<img src="/dnd-logo.png" alt="D&amp;D Logo" style={{ width: '100%' }} />
				// 			</Box>
				// 			<TextField label="Player" disabled />
				// 			<TextField label="Campaign" value="Morons go princess hunting" disabled />
				// 			<TextField label="XP" disabled />

				// 			<SectionHeader sx={{ mt: 2 }}>ABILITIES</SectionHeader>
				// 			<Grid container columnSpacing={1}>
				// 				<Grid item xs={2} />
				// 				<Grid item xs={2}>
				// 					<Typography sx={{ fontSize: 10 }}>Ability score</Typography>
				// 				</Grid>
				// 				<Grid item xs={2}>
				// 					<Typography sx={{ fontSize: 10 }}>Item bonus</Typography>
				// 				</Grid>
				// 				<Grid item xs={2}>
				// 					<Typography sx={{ fontSize: 10 }}>Ability modifier</Typography>
				// 				</Grid>
				// 				<Grid item xs={2}>
				// 					<Typography sx={{ fontSize: 10 }}>Temp bonus</Typography>
				// 				</Grid>
				// 				<Grid item xs={2}>
				// 					<Typography sx={{ fontSize: 10 }}>Temp modfier</Typography>
				// 				</Grid>
				// 				<AbilityRow character={character} ability="strength" />
				// 				<AbilityRow character={character} ability="dexterity" />
				// 				<AbilityRow character={character} ability="constitution" />
				// 				<AbilityRow character={character} ability="intelligence" />
				// 				<AbilityRow character={character} ability="wisdom" />
				// 				<AbilityRow character={character} ability="charisma" />
				// 			</Grid>
				// 			<SectionHeader>FEATS</SectionHeader>
				// 		</Stack>
				// 	</Grid>
				// 	<Grid item xs={2}>
				// 		<Stack>
				// 			<SectionHeader>CHARACTER</SectionHeader>
				// 			<Grid container columnSpacing={2} sx={{ pb: 2 }}>
				// 				<Grid item xs={8}>
				// 					<TextField label="Name" value={character.name} disabled />
				// 				</Grid>
				// 				<Grid item xs={2}>
				// 					<TextField label="Age" value={character.age} disabled />
				// 				</Grid>
				// 				<Grid item xs={2}>
				// 					<TextField label="Gender" value={character.gender} disabled />
				// 				</Grid>
				// 				<Grid item xs={7}>
				// 					<TextField label="Race" value={character.race} disabled />
				// 				</Grid>
				// 				<Grid item xs={3}>
				// 					<TextField label="Size" value={`${character.size.feet}ft ${character.size.inch}in`} disabled />
				// 				</Grid>
				// 				<Grid item xs={2}>
				// 					<TextField label="Size modifier" disabled />
				// 				</Grid>
				// 			</Grid>
				// 			<SectionHeader>HP</SectionHeader>
				// 			<Grid container spacing={2}>
				// 				<Grid item xs={4}>
				// 					<ReadOnlyField label="Max HP" value={(sumBy(character.levels, 'hp') + getAbilityModifier(character, 'constitution') * character.levels.length).toString()} />
				// 				</Grid>
				// 				<Grid item xs={4}>
				// 					<TextField type="number" label="Lethal Damage" />
				// 				</Grid>
				// 				<Grid item xs={4}>
				// 					<Typography>
				// 						<TextField type="number" label="Non lethal Damage" />
				// 					</Typography>
				// 				</Grid>
				// 			</Grid>
				// 			<SectionHeader>SKILLS</SectionHeader>
				// 			{areSkillsLoading && (
				// 				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				// 					<CircularProgress />
				// 				</Box>
				// 			)}
				// 			{skillsError && <Alert severity="error">An error happened fetching the skills.</Alert>}
				// 			{skills && (
				// 				<Grid container>
				// 					<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
				// 						<Typography>Skill</Typography>
				// 					</Grid>
				// 					<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
				// 						<Typography>Untrained</Typography>
				// 					</Grid>
				// 					<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
				// 						<Typography>Total bonus</Typography>
				// 					</Grid>
				// 					<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
				// 						<Typography>Ability bonus</Typography>
				// 					</Grid>
				// 					<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
				// 						<Typography>Class skill</Typography>
				// 					</Grid>
				// 					<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
				// 						<Typography>Ranks</Typography>
				// 					</Grid>
				// 					{map(orderBy(skills, 'name'), (skill) => {
				// 						let characterSkill = find(character.skills, { skillId: skill.id });
				// 						if (!characterSkill) {
				// 							characterSkill = {
				// 								characterId: character.id,
				// 								character,
				// 								countAsClassSkill: false,
				// 								points: null,
				// 								skillId: skill.id,
				// 								skill
				// 							};
				// 						}
				// 						return <CharacterSkillRow character={character} skill={characterSkill} />;
				// 					})}
				// 				</Grid>
				// 			)}
				// 		</Stack>
				// 	</Grid>
				// </Grid>
			)}
		</>
	);
}
