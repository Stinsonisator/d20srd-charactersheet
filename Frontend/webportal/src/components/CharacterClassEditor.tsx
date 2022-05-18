import { useCallback, useEffect, useRef } from 'react';

import { Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Icon, IconButton, Stack, TextField } from '@mui/material';
import { Form, Formik, FormikErrors } from 'formik';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import remove from 'lodash/remove';
import some from 'lodash/some';

import { useAddCharacterClassMutation, useGetCharacterClassQuery, useGetSkillsQuery, useUpdateCharacterClassMutation } from '../services/api';
import { globalDerender } from '../services/globalRenderSlice';
import { CharacterClass, CharacterClassSkill } from '../types/CharacterClass';
import { Skill } from '../types/Skill';
import { useAppDispatch } from '../utils/hooks';
import Loader from './Loader';

interface Props {
	renderKey: string;
	entityId?: number;
}

function validate(values: CharacterClass): FormikErrors<CharacterClass> {
	const errors: FormikErrors<CharacterClass> = {};

	if (!values.name) {
		errors.name = 'Required';
	}

	return errors;
}

export default function CharacterClassEditor({ renderKey, entityId }: Props): JSX.Element {
	const { data: skillData, isLoading: areSkillsLoading } = useGetSkillsQuery();
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

	function onchangeSkillCheckBox(characterClassSkills: CharacterClassSkill[], skill: Skill): CharacterClassSkill[] {
		const newCharacterClassSkills = [...characterClassSkills];
		const removedSkills = remove(newCharacterClassSkills, { skillId: skill.id });
		if (removedSkills.length <= 0) {
			newCharacterClassSkills.push({ skillId: skill.id, characterClassId: entityId });
		}
		return newCharacterClassSkills;
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
							classSkills: []
						}
					}
					validate={validate}
					onSubmit={(values: CharacterClass) => {
						if (!values.id) {
							addCharacterClass(values);
						} else {
							updateCharacterClass(values);
						}
					}}
					enableReinitialize
				>
					{({ values, errors, touched, setFieldValue, handleChange, handleBlur }) => (
						<Form id="characterClassEditor">
							{(isLoading || areSkillsLoading || addResult.isLoading || updateResult.isLoading) && <Loader />}
							<Stack sx={{ m: 2 }} spacing={2}>
								<TextField
									inputRef={firstField}
									id="name"
									name="name"
									label="Name"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.name && Boolean(errors.name)}
									helperText={touched.name && errors.name}
									required
									autoFocus
								/>
								<Grid container spacing={2} columns={12}>
									{map(orderBy(skillData, 'name'), (skill) => (
										<Grid item xs={3}>
											<FormControlLabel
												label={skill.name}
												control={
													<Checkbox
														checked={some(values.classSkills, { skillId: skill.id })}
														onChange={() => setFieldValue('classSkills', onchangeSkillCheckBox(values.classSkills, skill))}
													/>
												}
											/>
										</Grid>
									))}
								</Grid>
							</Stack>
						</Form>
					)}
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
