import { useParams } from 'react-router-dom';

import { Alert, Box, CircularProgress, GlobalStyles, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import find from 'lodash/find';
import map from 'lodash/map';

import { useGetCharacterQuery, useGetSkillsQuery } from '../../services/api';
import { AbilityRow } from './AbilityRow';
import CharacterSkillRow from './CharacterSkillRow';
import SectionHeader from './SectionHeader';
import orderBy from 'lodash/orderBy';

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
	const { data: character, error: characterError, isLoading: charcterIsLoading } = useGetCharacterQuery(id ? parseInt(id) : -1, { skip: !Boolean(id) });
	const { data: skills, error: skillsError, isLoading: areSkillsLoading } = useGetSkillsQuery();

	return (
		<>
			{globalStyles}
			{charcterIsLoading && (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			)}
			{characterError && <Alert severity="error">An error happened fetching the character.</Alert>}
			{character && (
				<Grid container spacing={2} columns={3}>
					<Grid item xs={1}>
						<Stack>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<img src="/dnd-logo.png" alt="D&amp;D Logo" style={{ width: '100%' }} />
							</Box>
							<TextField label="Player" disabled />
							<TextField label="Campaign" value="Morons go princess hunting" disabled />
							<TextField label="XP" disabled />

							<SectionHeader sx={{ mt: 2 }}>ABILITIES</SectionHeader>
							<Grid container columnSpacing={1}>
								<Grid item xs={2} />
								<Grid item xs={2}>
									<Typography sx={{ fontSize: 10 }}>Ability score</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography sx={{ fontSize: 10 }}>Item bonus</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography sx={{ fontSize: 10 }}>Ability modifier</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography sx={{ fontSize: 10 }}>Temp bonus</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography sx={{ fontSize: 10 }}>Temp modfier</Typography>
								</Grid>
								<AbilityRow characterClass={character.characterClass} abilityCode="str" abilityScore={character.strength} />
								<AbilityRow characterClass={character.characterClass} abilityCode="dex" abilityScore={character.dexterity} />
								<AbilityRow characterClass={character.characterClass} abilityCode="con" abilityScore={character.constitution} />
								<AbilityRow characterClass={character.characterClass} abilityCode="int" abilityScore={character.intelligence} />
								<AbilityRow characterClass={character.characterClass} abilityCode="wis" abilityScore={character.wisdom} />
								<AbilityRow characterClass={character.characterClass} abilityCode="cha" abilityScore={character.charisma} />
							</Grid>
							<SectionHeader>FEATS</SectionHeader>
						</Stack>
					</Grid>
					<Grid item xs={2}>
						<Stack>
							<SectionHeader>CHARACTER</SectionHeader>
							<Grid container columnSpacing={2} sx={{ pb: 2 }}>
								<Grid item xs={8}>
									<TextField label="Name" value={character.name} disabled />
								</Grid>
								<Grid item xs={2}>
									<TextField label="Age" value={character.age} disabled />
								</Grid>
								<Grid item xs={2}>
									<TextField label="Gender" value={character.gender} disabled />
								</Grid>
								<Grid item xs={7}>
									<TextField label="Race" value={character.race} disabled />
								</Grid>
								<Grid item xs={3}>
									<TextField label="Size" value={`${character.size.feet}ft ${character.size.inch}in`} disabled />
								</Grid>
								<Grid item xs={2}>
									<TextField label="Size modifier" disabled />
								</Grid>
							</Grid>
							<SectionHeader>SKILLS</SectionHeader>
							{areSkillsLoading && (
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<CircularProgress />
								</Box>
							)}
							{skills && (
								<Grid container>
									<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
										<Typography>Skill</Typography>
									</Grid>
									<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
										<Typography>Untrained</Typography>
									</Grid>
									<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
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
									{map(orderBy(skills, 'name'), (skill) => {
										let characterSkill = find(character.skills, { skillId: skill.id });
										if (!characterSkill) {
											characterSkill = {
												characterId: character.id,
												character,
												countAsClassSkill: false,
												points: null,
												skillId: skill.id,
												skill
											};
										}
										return <CharacterSkillRow character={character} skill={characterSkill} />;
									})}
								</Grid>
							)}
						</Stack>
					</Grid>
				</Grid>
			)}
		</>
	);
}
