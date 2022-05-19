import { useCallback, useEffect, useRef, useState } from 'react';

import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Tab, Tabs } from '@mui/material';
import { Form, Formik, FormikErrors } from 'formik';

import { useAddCharacterClassMutation, useGetCharacterClassQuery, useGetSkillsQuery, useUpdateCharacterClassMutation } from '../../services/api';
import { globalDerender } from '../../services/globalRenderSlice';
import { CharacterClass } from '../../types/CharacterClass';
import { useAppDispatch } from '../../utils/hooks';
import Loader from '../Loader';
import General from './General';
import Traits from './Traits';
import map from 'lodash/map';

interface Props {
	renderKey: string;
	entityId?: number;
}

function validate(values: CharacterClass): FormikErrors<CharacterClass> {
	const errors: FormikErrors<CharacterClass> = {};

	if (!values.name) {
		errors.name = 'Required';
	}

	if (!values.startingHp) {
		errors.startingHp = 'Required';
	}

	return errors;
}

export default function CharacterClassEditor({ renderKey, entityId }: Props): JSX.Element {
	const [currentTab, setCurrentTab] = useState(0);
	const { isLoading: areSkillsLoading } = useGetSkillsQuery();
	const [addCharacterClass, addResult] = useAddCharacterClassMutation();
	const [updateCharacterClass, updateResult] = useUpdateCharacterClassMutation();
	const { isLoading, data: loadResult } = useGetCharacterClassQuery(entityId ?? 0, { skip: Boolean(!entityId) });
	const reduxDispatch = useAppDispatch();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current?.focus();
	}, []);

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	useEffect(() => {
		if ((!addResult.isLoading && addResult.isSuccess) || (!updateResult.isLoading && updateResult.isSuccess)) {
			handleClose();
		}
	}, [handleClose, addResult.isLoading, addResult.isSuccess, updateResult.isLoading, updateResult.isSuccess]);

	function changeCurrentTab(event: React.SyntheticEvent, newValue: number) {
		setCurrentTab(newValue);
	}

	return (
		<Dialog onClose={handleClose} open fullWidth maxWidth="lg">
			<DialogTitle sx={(theme) => ({ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary })}>
				<Box display="flex" alignItems="center">
					<Box flexGrow={1}>Add new character class</Box>
					<Box>
						<IconButton onClick={handleClose}>
							<Icon className="fa-times" sx={{ fontSize: 16, color: 'text.secondary' }} />
						</IconButton>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={
						loadResult ?? {
							id: 0,
							name: '',
							startingHp: 0,
							classSkills: [],
							traits: []
						}
					}
					validate={validate}
					onSubmit={(values: CharacterClass) => {
						const characterClassToSave: CharacterClass = {
							...values,
							traits: map(values.traits, (trait) => ({
								...trait,
								id: trait.id < 0 ? 0 : trait.id
							}))
						};
						if (!values.id) {
							addCharacterClass(characterClassToSave);
						} else {
							updateCharacterClass(characterClassToSave);
						}
					}}
					enableReinitialize
				>
					<Form id="characterClassEditor">
						{(isLoading || areSkillsLoading || addResult.isLoading || updateResult.isLoading) && <Loader />}
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={currentTab} onChange={changeCurrentTab}>
								<Tab label="General" />
								<Tab label="Traits" />
							</Tabs>
						</Box>
						{
							{
								0: <General />,
								1: <Traits />
							}[currentTab]
						}
					</Form>
				</Formik>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Button variant="contained" color="primary" type="submit" form="characterClassEditor">
					Save
				</Button>
				{(addResult.isLoading || isLoading) && (
					<CircularProgress
						size={24}
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							marginTop: '-12px',
							marginLeft: '-12px'
						}}
					/>
				)}
			</DialogActions>
		</Dialog>
	);
}
