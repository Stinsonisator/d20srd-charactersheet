import { useCallback, useEffect, useRef } from 'react';

import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, IconButton, Stack, TextField } from '@mui/material';
import { Form, Formik, FormikErrors } from 'formik';

import { useAddSkillMutation } from '../services/api';
import { globalDerender } from '../services/globalRenderSlice';
import { Skill } from '../types/Skill';
import { useAppDispatch } from '../utils/hooks';

interface Props {
	renderKey: string;
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

export default function SkillEditor({ renderKey }: Props): JSX.Element {
	const [addSkill, result] = useAddSkillMutation();
	const reduxDispatch = useAppDispatch();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current?.focus();
	}, []);

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	useEffect(() => {
		if (!result.isLoading && result.isSuccess) {
			handleClose();
		}
	}, [handleClose, result.isLoading, result.isSuccess]);

	return (
		<Dialog onClose={handleClose} open fullWidth maxWidth="lg">
			<Formik
				initialValues={{
					id: 0,
					name: '',
					keyAbility: 'STR',
					trainedOnly: true
				}}
				validate={validate}
				onSubmit={(values: Skill) => {
					addSkill(values);
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur }) => (
					<Form>
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
							<DialogContentText sx={{ my: 2 }}>
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
									/>
									<div>2</div>
								</Stack>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} variant="outlined">
								Cancel
							</Button>
							<Button variant="contained" color="primary" type="submit">
								Save
							</Button>
							{result.isLoading && (
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
					</Form>
				)}
			</Formik>
		</Dialog>
	);
}
