import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Alert, Avatar, Box, GlobalStyles, Icon, IconButton, Tab, Tabs, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import Loader from '../../components/Loader';
import { useGetCharacterQuery, useGetSkillsQuery } from '../../services/api';
import { globalRender } from '../../services/globalRenderSlice';
import { calculateCharacterSheetData } from '../../utils/calculations';
import { useAppDispatch } from '../../utils/hooks';
import Abilities from './Abilities';
import DamagePopup from './DamagePopup';
import HealPopup from './HealPopup';
import Money from './Money';
import SavingThrows from './SavingThrows';
import Skills from './Skills';
import map from 'lodash/map';
import PoolPopup from './PoolPopup';

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
	const { error: skillsError, isLoading: areSkillsLoading, isSuccess: skillsSuccesfullyLoaded, data: skills } = useGetSkillsQuery();
	const reduxDispatch = useAppDispatch();

	const characterSheetData = useMemo(() => {
		if (character && skillsSuccesfullyLoaded) return calculateCharacterSheetData(character, skills);
		return undefined;
	}, [character, skills, skillsSuccesfullyLoaded]);

	function showDamagePopup() {
		reduxDispatch(globalRender({ key: 'damagePopup', component: <DamagePopup renderKey="damagePopup" character={character} /> }));
	}

	function showHealPopup() {
		reduxDispatch(globalRender({ key: 'healPopup', component: <HealPopup renderKey="healPopup" character={character} /> }));
	}

	function showPoolPopup(poolName: string) {
		reduxDispatch(
			globalRender({
				key: `poolPopUp_${poolName}`,
				component: <PoolPopup renderKey={`poolPopUp_${poolName}`} character={character} poolName={poolName} />
			})
		);
	}

	return (
		<>
			{globalStyles}
			{(characterIsLoading || areSkillsLoading) && <Loader />}
			{characterError && <Alert severity="error">An error happened fetching the character.</Alert>}
			{skillsError && <Alert severity="error">An error happened fetching the skills.</Alert>}
			{characterSheetData && (
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
							<Avatar src={characterSheetData.image} />
						</Grid>
						<Grid item xs={2} md={1} display="flex" alignItems="center">
							<Typography fontSize={25} fontWeight="bold">
								{characterSheetData.name}
							</Typography>
						</Grid>
						<Grid item xs={4} display="flex" alignItems="center">
							<Typography textAlign="center">Lethal: </Typography>
							<Typography textAlign="center" fontSize={25} mr={1}>
								{characterSheetData.maxHp - characterSheetData.lethalDamage}/{characterSheetData.maxHp}
							</Typography>
							<Typography textAlign="center">Nonlethal: </Typography>
							<Typography textAlign="center" fontSize={25}>
								{characterSheetData.maxHp - characterSheetData.nonlethalDamage}/{characterSheetData.maxHp}
							</Typography>
							<IconButton color="error" onClick={showDamagePopup}>
								<Icon className="fa-skull-crossbones" />
							</IconButton>
							<IconButton color="success" onClick={showHealPopup}>
								<Icon className="fa-hand-holding-medical" />
							</IconButton>
						</Grid>
						{map(characterSheetData.pools, (pool) => (
							<Grid item xs={2} display="flex" alignItems="center">
								<Typography textAlign="center">{pool.name}: </Typography>
								<Typography textAlign="center" fontSize={25} mr={1}>
									{pool.remaining}/{pool.total}
								</Typography>
								{pool.remaining >= pool.total && (
									<IconButton color="error" onClick={() => showPoolPopup(pool.name)}>
										<Icon className="fa-minus" />
									</IconButton>
								)}
								{pool.remaining <= 0 && (
									<IconButton color="success" onClick={() => showPoolPopup(pool.name)}>
										<Icon className="fa-plus" />
									</IconButton>
								)}
							</Grid>
						))}
					</Grid>
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
			)}
		</>
	);
}
