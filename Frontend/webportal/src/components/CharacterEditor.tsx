import { useCallback, useEffect, useState } from 'react';

import { Button, DialogActions, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { Form, Formik } from 'formik';
import filter from 'lodash/filter';

import { useGetCharacterQuery, useGetSkillsQuery, useUpdateCharacterMutation } from '../services/api';
import { globalDerender } from '../services/globalRenderSlice';
import { Character } from '../types/Character';
import { useAppDispatch } from '../utils/hooks';
import Attributes from './Attributes';
import Inventory from './Inventory';
import Loader from './Loader';
import Skills from './Skills';

interface Props {
	renderKey: string;
	entityId: number;
}

function CharacterEditor({ renderKey, entityId }: Props): JSX.Element {
	const [currentTab, setCurrentTab] = useState(0);
	const { isLoading: areSkillsLoading } = useGetSkillsQuery();
	const { isLoading, data: loadResult } = useGetCharacterQuery(entityId);
	const [updateCharacter, updateResult] = useUpdateCharacterMutation();
	const reduxDispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	useEffect(() => {
		if (!updateResult.isLoading && updateResult.isSuccess) {
			handleClose();
		}
	}, [handleClose, updateResult.isLoading, updateResult.isSuccess]);

	return (
		<Dialog onClose={handleClose} open fullWidth maxWidth="lg" scroll="paper">
			<DialogTitle sx={(theme) => ({ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary })}>
				<Box display="flex" alignItems="center">
					<Box flexGrow={1}>Edit {loadResult?.name}</Box>
					<Box>
						<IconButton onClick={handleClose}>
							<Icon className="fa-times" sx={{ fontSize: 16, color: 'text.secondary' }} />
						</IconButton>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent sx={{ my: 2 }}>
				<Formik
					initialValues={
						loadResult ?? {
							id: 0,
							name: '',
							age: 21,
							gender: 'm',
							race: 'human',
							size: {
								feet: 0,
								inch: 0
							},
							image: '',
							characterClassId: null,
							strength: 8,
							dexterity: 8,
							constitution: 8,
							intelligence: 8,
							wisdom: 8,
							charisma: 8,
							lethalDamage: 0,
							nonlethalDamage: 0,
							copper: null,
							silver: null,
							gold: null,
							platinum: null,
							skills: [],
							levels: []
						}
					}
					enableReinitialize
					onSubmit={(character: Character) => {
						updateCharacter({
							...character,
							copper: character.copper?.toString() === '' ? null : character.copper,
							silver: character.silver?.toString() === '' ? null : character.silver,
							gold: character.gold?.toString() === '' ? null : character.gold,
							platinum: character.platinum?.toString() === '' ? null : character.platinum,
							skills: filter(character.skills, (skill) => {
								return +skill.points > 0;
							})
						});
					}}
				>
					<Form id="characterWizard">
						{(isLoading || areSkillsLoading || updateResult.isLoading) && <Loader />}
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={currentTab} onChange={(_event, newValue) => setCurrentTab(newValue)}>
								<Tab label="Attributes" />
								<Tab label="Skills" />
								<Tab label="Inventory" />
							</Tabs>
						</Box>
						{!isLoading && (
							<>
								{
									{
										0: <Attributes />,
										1: <Skills />,
										2: <Inventory />
									}[currentTab]
								}
							</>
						)}
					</Form>
				</Formik>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Button variant="contained" color="primary" type="submit" form="characterWizard">
					Finish
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default CharacterEditor;
