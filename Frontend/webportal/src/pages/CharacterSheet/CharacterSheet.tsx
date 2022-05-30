import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Alert, Avatar, Box, CircularProgress, GlobalStyles, Icon, IconButton, Tab, Tabs, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { useGetCharacterQuery, useGetSkillsQuery } from '../../services/api';
import { globalRender } from '../../services/globalRenderSlice';
import { getMaxHp } from '../../utils';
import { useAppDispatch } from '../../utils/hooks';
import Abilities from './Abilities';
import DamagePopup from './DamagePopup';
import HealPopup from './HealPopup';
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
		isLoading: characterIsLoading
	} = useGetCharacterQuery(id ? parseInt(id) : -1, { skip: !Boolean(id) });
	const { error: skillsError, isLoading: areSkillsLoading } = useGetSkillsQuery();
	const reduxDispatch = useAppDispatch();

	const maxHp = useMemo(() => {
		if (character) return getMaxHp(character);
		return 0;
	}, [character]);

	function showDamagePopup() {
		reduxDispatch(globalRender({ key: 'damagePopup', component: <DamagePopup renderKey="damagePopup" character={character} /> }));
	}

	function showHealPopup() {
		reduxDispatch(globalRender({ key: 'healPopup', component: <HealPopup renderKey="healPopup" character={character} /> }));
	}

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
					<Grid
						container
						spacing={2}
						sx={(theme) => ({
							backgroundColor: theme.palette.secondary.light,
							pb: 2,
							borderRadius: 2,
							color: theme.palette.secondary.contrastText
						})}
					>
						<Grid item xs={1}>
							<Avatar src={character.image} />
						</Grid>
						<Grid item xs={2} md={1} display="flex" alignItems="center">
							<Typography fontSize={25} fontWeight="bold">
								{character.name}
							</Typography>
						</Grid>
						<Grid item xs={4} display="flex" alignItems="center">
							<Typography textAlign="center">Lethal: </Typography>
							<Typography textAlign="center" fontSize={25} mr={1}>
								{maxHp - character.lethalDamage}/{maxHp}
							</Typography>
							<Typography textAlign="center">Nonlethal: </Typography>
							<Typography textAlign="center" fontSize={25}>
								{maxHp - character.nonlethalDamage}/{maxHp}
							</Typography>
							<IconButton color="error" onClick={showDamagePopup}>
								<Icon className="fa-skull-crossbones" />
							</IconButton>
							<IconButton color="success" onClick={showHealPopup}>
								<Icon className="fa-hand-holding-medical" />
							</IconButton>
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
									<Grid container spacing={2} columns={6}>
										<Grid item xs={6}>
											<Abilities character={character} />
										</Grid>
										<Grid item xs={6} md={1}>
											<SavingThrows character={character} />
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
