import { useCallback, useEffect, useState } from 'react';

import { Button, DialogActions, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { Form, Formik } from 'formik';

import { useGetCharacterQuery, useGetSkillsQuery, useUpdateCharacterMutation } from '../services/api';
import { globalDerender } from '../services/globalRenderSlice';
import { Character } from '../types/Character';
import { useAppDispatch } from '../utils/hooks';
import Attributes from './CharacterWizard/Attributes';
import SkillsForEditor from './CharacterWizard/SkillsForEditor';
import Loader from './Loader';

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
					<Box flexGrow={1}>Add new character</Box>
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
							skills: [],
							levels: []
						}
					}
					enableReinitialize
					onSubmit={(values: Character) => {
						updateCharacter(values);
					}}
				>
					<Form id="characterWizard">
						{(isLoading || areSkillsLoading || updateResult.isLoading) && <Loader />}
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={currentTab} onChange={(_event, newValue) => setCurrentTab(newValue)}>
								<Tab label="Attributes" />
								<Tab label="Skills" />
							</Tabs>
						</Box>
						{!isLoading && (
							<>
								{
									{
										0: <Attributes />,
										1: <SkillsForEditor character={loadResult} />
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
