import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { Form, Formik, FormikErrors } from 'formik';
import { useDispatch } from 'react-redux';

import { globalDerender } from '../../services/globalRenderSlice';
import { CharacterClassTrait } from '../../types/CharacterClass';
import CharacterClassTraitEditorForm from './CharacterClassTraitEditorForm';

interface Props {
	renderKey: string;
	characterClassId: number;
	trait?: CharacterClassTrait;
	saveTrait: (characterClassTrait: CharacterClassTrait) => void;
}

function validate(values: CharacterClassTrait): FormikErrors<CharacterClassTrait> {
	const errors: FormikErrors<CharacterClassTrait> = {};

	if (!values.name) {
		errors.name = 'Required';
	}
	if (!values.level) {
		errors.level = 'Required';
	}

	return errors;
}

function CharacterClassTraitEditor({ renderKey, characterClassId, trait, saveTrait }: Props) {
	const reduxDispatch = useDispatch();

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

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
						trait ?? {
							id: 0,
							characterClassId,
							name: '',
							level: 1,
							rule: {
								ability: 'strength',
								adjustment: 0
							}
						}
					}
					validate={validate}
					onSubmit={(values: CharacterClassTrait) => {
						saveTrait(values);
						handleClose();
					}}
					enableReinitialize
				>
					<Form id="traitEditor">
						<CharacterClassTraitEditorForm />
					</Form>
				</Formik>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Button variant="contained" color="primary" type="submit" form="traitEditor">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default CharacterClassTraitEditor;
