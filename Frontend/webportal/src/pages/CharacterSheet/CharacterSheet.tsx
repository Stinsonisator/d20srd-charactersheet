import { useParams } from 'react-router-dom';

import { Alert, Box, CircularProgress, GlobalStyles, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { useGetCharacterQuery } from '../../services/api';
import { AbilityRow } from './AbilityRow';
import SectionHeader from './SectionHeader';

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
	const { data: character, error, isLoading } = useGetCharacterQuery(id ? parseInt(id) : -1, { skip: !Boolean(id) });

	return (
		<>
			{globalStyles}
			{isLoading && (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			)}
			{error && <Alert severity="error">An error happened fetching the character.</Alert>}
			{character && (
				<Grid container spacing={2}>
					<Grid item xs={3}>
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
								<AbilityRow characterClass={character.class} abilityCode="STR" abilityScore={character.strength} />
								<AbilityRow characterClass={character.class} abilityCode="DEX" abilityScore={character.dexterity} />
								<AbilityRow characterClass={character.class} abilityCode="CON" abilityScore={character.constitution} />
								<AbilityRow characterClass={character.class} abilityCode="INT" abilityScore={character.intelegence} />
								<AbilityRow characterClass={character.class} abilityCode="WIS" abilityScore={character.wisdom} />
								<AbilityRow characterClass={character.class} abilityCode="CHA" abilityScore={character.charisma} />
							</Grid>
						</Stack>
					</Grid>
					<Grid item xs>
						<Stack>
							<SectionHeader>CHARACTER</SectionHeader>
							<Grid container columnSpacing={2} sx={{ borderBottom: 2 }}>
								<Grid item xs={8}>
									<TextField label="Name" value={character.name} disabled />
								</Grid>
								<Grid item xs={2}>
									<TextField label="Age" disabled />
								</Grid>
								<Grid item xs={2}>
									<TextField label="Gender" disabled />
								</Grid>
								<Grid item xs={7}>
									<TextField label="Race" disabled />
								</Grid>
								<Grid item xs={3}>
									<TextField label="Size" disabled />
								</Grid>
								<Grid item xs={2}>
									<TextField label="SIze modifier" disabled />
								</Grid>
							</Grid>
						</Stack>
					</Grid>
				</Grid>
			)}
		</>
	);
}
