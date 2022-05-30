import { useCallback } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton } from '@mui/material';
import { Formik, FormikErrors } from 'formik';

import { usePartialUpdateCharacterMutation } from '../../../services/api';
import { globalDerender } from '../../../services/globalRenderSlice';
import { Character } from '../../../types/Character';
import { useAppDispatch } from '../../../utils/hooks';
import DamagePopupForm from './DamagePopupForm';

export type Damage = Partial<Pick<Character, 'lethalDamage' | 'nonlethalDamage'>>;

interface Props {
	renderKey: string;
	character: Character;
}

function validate(values: Damage): FormikErrors<Damage> {
	const errors: FormikErrors<Damage> = {};

	if (!values.lethalDamage && !values.nonlethalDamage) {
		errors.lethalDamage = 'At least one required';
		errors.nonlethalDamage = 'At least one required';
	}

	return errors;
}

export default function DamagePopup({ renderKey, character }: Props): JSX.Element {
	const [update] = usePartialUpdateCharacterMutation();
	const reduxDispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	return (
		<Dialog onClose={handleClose} open fullWidth maxWidth="xs" PaperProps={{ sx: { position: 'fixed', top: 50 } }}>
			<DialogTitle sx={(theme) => ({ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary })}>
				<Box display="flex" alignItems="center">
					<Box flexGrow={1}>Add damage</Box>
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
					onSubmit={(values: Damage) => {
						handleClose();
						update({
							id: character.id,
							lethalDamage: values.lethalDamage ? character.lethalDamage + values.lethalDamage : undefined,
							nonlethalDamage: values.nonlethalDamage ? character.nonlethalDamage + values.nonlethalDamage : undefined
						});
					}}
				>
					<DamagePopupForm />
				</Formik>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Button variant="contained" color="primary" type="submit" form="damagePopup">
					Apply
				</Button>
			</DialogActions>
		</Dialog>
	);
}
