import { useCallback, useEffect, useRef } from 'react';

import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Icon, IconButton, MenuItem, Stack, Switch, TextField } from '@mui/material';
import { Form, Formik, FormikErrors } from 'formik';

import { useAddSkillMutation, useGetSkillQuery, useUpdateSkillMutation } from '../services/api';
import { globalDerender } from '../services/globalRenderSlice';
import { Skill } from '../types/Skill';
import { useAppDispatch } from '../utils/hooks';

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
	const [addSkill, addResult] = useAddSkillMutation();
	const [updateSkill, updateResult] = useUpdateSkillMutation();
	const { isLoading, data: loadResult } = useGetSkillQuery(entityId ?? 0, { skip: Boolean(!entityId) });
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
							keyAbility: 'str',
							untrained: true
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
					{({ values, errors, touched, handleChange, handleBlur }) => (
						<Form id="skillEditor">
							{(isLoading || addResult.isLoading || updateResult.isLoading) && (
								<Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
									<CircularProgress color="inherit" />
								</Backdrop>
							)}
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
								<TextField
									id="keyAbility"
									name="keyAbility"
									label="Key ability"
									select
									value={values.keyAbility}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.keyAbility && Boolean(errors.keyAbility)}
									helperText={touched.keyAbility && errors.keyAbility}
									required
								>
									<MenuItem value="str">STR</MenuItem>
									<MenuItem value="dex">DEX</MenuItem>
									<MenuItem value="con">CON</MenuItem>
									<MenuItem value="int">INT</MenuItem>
									<MenuItem value="wis">WIS</MenuItem>
									<MenuItem value="cha">CHA</MenuItem>
								</TextField>
								<FormControlLabel
									control={<Switch color="primary" id="untrained" name="untrained" checked={values.untrained} onChange={handleChange} />}
									label="Untrained"
									labelPlacement="top"
									sx={{ alignItems: 'flex-start' }}
								/>
							</Stack>
						</Form>
					)}
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
