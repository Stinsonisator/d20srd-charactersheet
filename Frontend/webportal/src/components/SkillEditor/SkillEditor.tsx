import { useCallback, useEffect, useState } from 'react';

import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Tab, Tabs } from '@mui/material';
import { Form, Formik, FormikErrors } from 'formik';

import { useAddSkillMutation, useGetSkillQuery, useUpdateSkillMutation } from '../../services/api';
import { globalDerender } from '../../services/globalRenderSlice';
import { Skill } from '../../types/Skill';
import { useAppDispatch } from '../../utils/hooks';
import Loader from '../Loader';
import SkillEditorContent from './SkillEditorContent';
import Synergies from './Synergies';

interface Props {
	renderKey: string;
	entityId?: number;
}

function validate(values: Skill): FormikErrors<Skill> {
	const errors: FormikErrors<Skill> = {};

	if (!values.name) {
		errors.name = 'Required';
	}
	if (!values.keyAbility) {
		errors.keyAbility = 'Required';
	}

	return errors;
}

export default function SkillEditor({ renderKey, entityId }: Props): JSX.Element {
	const [currentTab, setCurrentTab] = useState(0);
	const [addSkill, addResult] = useAddSkillMutation();
	const [updateSkill, updateResult] = useUpdateSkillMutation();
	const { isLoading, data: loadResult } = useGetSkillQuery(entityId ?? 0, { skip: Boolean(!entityId) });
	const reduxDispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	useEffect(() => {
		if ((!addResult.isLoading && addResult.isSuccess) || (!updateResult.isLoading && updateResult.isSuccess)) {
			handleClose();
		}
	}, [handleClose, addResult.isLoading, addResult.isSuccess, updateResult.isLoading, updateResult.isSuccess]);

	function changeCurrentTab(_event: React.SyntheticEvent, newValue: number) {
		setCurrentTab(newValue);
	}

	return (
		<Dialog onClose={handleClose} open fullWidth maxWidth="lg">
			<DialogTitle sx={(theme) => ({ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary })}>
				<Box display="flex" alignItems="center">
					<Box flexGrow={1}>Add new skill</Box>
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
							keyAbility: 'strength',
							untrained: true,
							outgoingSkillSyngergies: []
						}
					}
					validate={validate}
					onSubmit={(values: Skill) => {
						if (!values.id) {
							addSkill(values);
						} else {
							updateSkill(values);
						}
					}}
					enableReinitialize
				>
					<Form id="skillEditor">
						{(isLoading || addResult.isLoading || updateResult.isLoading) && <Loader />}
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={currentTab} onChange={changeCurrentTab}>
								<Tab label="General" />
								<Tab label="Synergies" />
							</Tabs>
						</Box>
						{
							{
								0: <SkillEditorContent />,
								1: <Synergies />
							}[currentTab]
						}
					</Form>
				</Formik>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Button variant="contained" color="primary" type="submit" form="skillEditor">
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
