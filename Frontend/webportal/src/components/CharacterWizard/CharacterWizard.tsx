import { useCallback, useEffect, useState } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Step, StepLabel, Stepper } from '@mui/material';
import { Form, Formik, FormikErrors } from 'formik';
import filter from 'lodash/filter';
import map from 'lodash/map';

import { useAddCharacterMutation } from '../../services/api';
import { globalDerender } from '../../services/globalRenderSlice';
import { Character } from '../../types/Character';
import { useAppDispatch } from '../../utils/hooks';
import Loader from '../Loader';
import Attributes from './Attributes';
import Skills from './Skills';

interface Props {
	renderKey: string;
}

const steps = [
	{ label: 'Attributes', content: <Attributes /> },
	{ label: 'Skills', content: <Skills /> },
	{ label: 'Feats', content: <Box sx={{ m: 2 }}>Feats</Box> },
	{ label: 'Equipment', content: <Box sx={{ m: 2 }}>Equipment</Box> }
];

function validate(values: Character): FormikErrors<Character> {
	const errors: FormikErrors<Character> = {};

	if (!values.name) {
		errors.name = 'Required';
	}
	if (!values.image) {
		errors.image = 'Required';
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
		errors.characterClassId = 'Required';
	}

	return errors;
}

export default function CharacterWizard({ renderKey }: Props): JSX.Element {
	const [activeStep, setActiveStep] = useState(0);
	const [addCharacter, characterAddResult] = useAddCharacterMutation();
	const reduxDispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	useEffect(() => {
		if (!characterAddResult.isLoading && characterAddResult.isSuccess) {
			handleClose();
		}
	}, [handleClose, characterAddResult.isLoading, characterAddResult.isSuccess]);

	const save = useCallback(
		(character: Character) => {
			addCharacter({
				...character,
				skills: filter(character.skills, (skill) => {
					return +skill.points > 0;
				}),
				levels: [
					{
						id: 0,
						hp: character.characterClass.startingHp
					}
				]
			});
		},
		[addCharacter]
	);

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
					initialValues={{
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
					}}
					validate={validate}
					onSubmit={(values: Character) => {
						if (activeStep === steps.length - 1) {
							save(values);
						} else {
							setActiveStep(activeStep + 1);
						}
					}}
				>
					<Form id="characterWizard">
						{characterAddResult.isLoading && <Loader />}
						<Stepper activeStep={activeStep}>
							{map(steps, (step, index) => (
								<Step completed={activeStep > index}>
									<StepLabel>{step.label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<Box sx={{ m: 2 }}>{steps[activeStep].content}</Box>
					</Form>
				</Formik>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Box sx={{ flex: '1 1 auto' }} />
				{activeStep > 0 && (
					<Button
						onClick={() => setActiveStep(activeStep - 1)}
						variant="outlined"
						sx={{ color: 'secondary.dark', borderColor: 'secondary.dark' }}
					>
						Back
					</Button>
				)}
				{activeStep < steps.length - 1 ? (
					<Button variant="contained" color="secondary" type="submit" form="characterWizard">
						Next
					</Button>
				) : (
					<Box sx={{ position: 'relative' }}>
						<Button variant="contained" color="primary" type="submit" form="characterWizard">
							Finish
						</Button>
					</Box>
				)}
			</DialogActions>
		</Dialog>
	);
}
