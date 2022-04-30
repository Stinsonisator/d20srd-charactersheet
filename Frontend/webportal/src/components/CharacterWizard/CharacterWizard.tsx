import { useCallback, useEffect, useState } from 'react';

import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, IconButton, Step, StepLabel, Stepper } from '@mui/material';
import { Form, Formik, FormikErrors } from 'formik';
import map from 'lodash/map';

import { useAddCharacterMutation } from '../../services/api';
import { globalDerender } from '../../services/globalRenderSlice';
import { Character } from '../../types/Character';
import { useAppDispatch } from '../../utils/hooks';
import Attributes from './Attributes';

interface Props {
	renderKey: string;
}

const steps = [
	{ label: 'Attributes', content: <Attributes /> },
	{ label: 'Skills', content: <Box sx={{ m: 2 }}>Skills</Box> },
	{ label: 'Feats', content: <Box sx={{ m: 2 }}>Feats</Box> },
	{ label: 'Equipment', content: <Box sx={{ m: 2 }}>Equipment</Box> }
];

function validate(values: Character): FormikErrors<Character> {
	const errors: FormikErrors<Character> = {};

	if (!values.name) {
		errors.name = 'Required';
	}
	if (!values.age) {
		errors.age = 'Required';
	} else if (values.age < 21 || values.age > 26) {
		errors.age = 'Between 21 and 26';
	}
	if (!values.gender) {
		errors.gender = 'Required';
	}
	if (!values.race) {
		errors.race = 'Required';
	}
	if (!values.characterClass) {
		errors.characterClass = 'Required';
	}

	return errors;
}

export default function CharacterWizard({ renderKey }: Props): JSX.Element {
	const [activeStep, setActiveStep] = useState(0);
	const [addCharacter, result] = useAddCharacterMutation();
	const reduxDispatch = useAppDispatch();

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
					age: 21,
					gender: 'm',
					race: 'human',
					size: 70,
					characterClass: 'blackBelt',
					strength: 8,
					dexterity: 8,
					constitution: 8,
					intelligence: 8,
					wisdom: 8,
					charisma: 8
				}}
				validate={validate}
				onSubmit={(values: Character) => {
					if (activeStep === steps.length - 1) {
						addCharacter(values);
					} else {
						setActiveStep(activeStep + 1);
					}
				}}
			>
				<Form>
					<DialogTitle sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}>
						<Box display="flex" alignItems="center">
							<Box flexGrow={1}>Add new character</Box>
							<Box>
								<IconButton onClick={handleClose}>
									<Icon className="fa-times" sx={{ fontSize: 16 }} />
								</IconButton>
							</Box>
						</Box>
					</DialogTitle>
					<DialogContent>
						<DialogContentText sx={{ my: 2 }}>
							<Stepper activeStep={activeStep}>
								{map(steps, (step, index) => (
									<Step completed={activeStep > index}>
										<StepLabel>{step.label}</StepLabel>
									</Step>
								))}
							</Stepper>
							<Box sx={{ m: 2 }}>{steps[activeStep].content}</Box>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} variant="outlined">
							Cancel
						</Button>
						<Box sx={{ flex: '1 1 auto' }} />
						{activeStep > 0 && (
							<Button onClick={() => setActiveStep(activeStep - 1)} variant="outlined" sx={{ color: 'secondary.dark', borderColor: 'secondary.dark' }}>
								Back
							</Button>
						)}
						{activeStep < steps.length - 1 ? (
							<Button variant="contained" color="secondary" type="submit">
								Next
							</Button>
						) : (
							<Box sx={{ position: 'relative' }}>
								<Button variant="contained" color="primary" type="submit">
									Finish
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
							</Box>
						)}
					</DialogActions>
				</Form>
			</Formik>
		</Dialog>
	);
}
