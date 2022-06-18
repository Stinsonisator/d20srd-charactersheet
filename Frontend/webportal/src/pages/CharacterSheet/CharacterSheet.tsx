import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Alert, Box, GlobalStyles, Tab, Tabs } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import Loader from '../../components/Loader';
import { useGetCharacterQuery, useGetSkillsQuery } from '../../services/api';
import { calculateCharacterSheetData } from '../../utils/calculations';
import Abilities from './Abilities';
import Header from './Header';
import Money from './Money';
import SavingThrows from './SavingThrows';
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
	const {
		data: character,
		error: characterError,
		isFetching: characterIsLoading
	} = useGetCharacterQuery(id ? parseInt(id) : -1, { skip: !Boolean(id) });
	const { error: skillsError, isLoading: areSkillsLoading, isSuccess: skillsSuccesfullyLoaded, data: skills } = useGetSkillsQuery();

	const characterSheetData = useMemo(() => {
		if (character && skillsSuccesfullyLoaded) return calculateCharacterSheetData(character, skills);
		return undefined;
	}, [character, skills, skillsSuccesfullyLoaded]);

	return (
		<>
			{globalStyles}
			{(characterIsLoading || areSkillsLoading) && <Loader />}
			{characterError && <Alert severity="error">An error happened fetching the character.</Alert>}
			{skillsError && <Alert severity="error">An error happened fetching the skills.</Alert>}
			{characterSheetData && (
				<>
					<Header character={character} characterSheetData={characterSheetData} />
					<Stack spacing={1} sx={{ my: 1 }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={currentTab} onChange={(_event, newValue) => setCurrentTab(newValue)}>
								<Tab label="Abilities, saves & skills" />
								<Tab label="Combat stats" />
								<Tab label="Inventory" />
							</Tabs>
						</Box>
						<Box py={1}>
							{
								{
									0: (
										<Grid container spacing={2} columns={6}>
											<Grid item xs={6}>
												<Abilities character={characterSheetData} />
											</Grid>
											<Grid item xs={6} md={1}>
												<SavingThrows character={characterSheetData} />
											</Grid>
											<Grid item xs>
												<Skills character={characterSheetData} />
											</Grid>
										</Grid>
									),
									2: (
										<Grid container columns={3}>
											<Grid item xs={1}>
												<Money character={character} />
											</Grid>
										</Grid>
									)
								}[currentTab]
							}
						</Box>
					</Stack>
				</>
			)}
		</>
	);
}
