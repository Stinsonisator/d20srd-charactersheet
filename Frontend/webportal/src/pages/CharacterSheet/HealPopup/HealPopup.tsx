import { useCallback } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton } from '@mui/material';
import { Formik, FormikErrors } from 'formik';

import { usePartialUpdateCharacterMutation } from '../../../services/api';
import { globalDerender } from '../../../services/globalRenderSlice';
import { Character } from '../../../types/Character';
import { useAppDispatch } from '../../../utils/hooks';
import HealPopupForm from './HealPopupForm';

export type Heal = { amount?: number };

interface Props {
	renderKey: string;
	character: Character;
}

function validate(values: Heal): FormikErrors<Heal> {
	const errors: FormikErrors<Heal> = {};

	if (!values.amount) {
		errors.amount = 'Required';
	}

	return errors;
}

export default function HealPopup({ renderKey, character }: Props): JSX.Element {
	const [update] = usePartialUpdateCharacterMutation();
	const reduxDispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	return (
		<Dialog onClose={handleClose} open fullWidth maxWidth="xs" PaperProps={{ sx: { position: 'fixed', top: 50 } }}>
			<DialogTitle sx={(theme) => ({ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary })}>
				<Box display="flex" alignItems="center">
					<Box flexGrow={1}>Heal</Box>
					<Box>
						<IconButton onClick={handleClose}>
							<Icon className="fa-times" sx={{ fontSize: 16, color: 'text.secondary' }} />
						</IconButton>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={{}}
					validate={validate}
					onSubmit={(values: Heal) => {
						handleClose();
						update({
							id: character.id,
							lethalDamage: character.lethalDamage > 0 ? Math.max(character.lethalDamage - values.amount, 0) : undefined,
							nonlethalDamage: character.nonlethalDamage > 0 ? Math.max(character.nonlethalDamage - values.amount, 0) : undefined
						});
					}}
				>
					<HealPopupForm />
				</Formik>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Button variant="contained" color="primary" type="submit" form="healPopup">
					Apply
				</Button>
			</DialogActions>
		</Dialog>
	);
}
