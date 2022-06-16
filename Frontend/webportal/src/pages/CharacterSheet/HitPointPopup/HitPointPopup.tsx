import { useCallback } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton } from '@mui/material';
import { Form, Formik, FormikErrors } from 'formik';

import { usePartialUpdateCharacterMutation } from '../../../services/api';
import { globalDerender } from '../../../services/globalRenderSlice';
import { Character } from '../../../types/Character';
import { useAppDispatch } from '../../../utils/hooks';
import HitPointPopupForm from './HitPointPopupForm';

export type HitpointsMutation = Partial<Pick<Character, 'lethalDamage' | 'nonlethalDamage'>> & { mutation: 'heal' | 'damage' };

interface Props {
	renderKey: string;
	character: Character;
}

function validate(values: HitpointsMutation): FormikErrors<HitpointsMutation> {
	const errors: FormikErrors<HitpointsMutation> = {};

	if (!values.lethalDamage && !values.nonlethalDamage) {
		errors.lethalDamage = 'At least one required';
		errors.nonlethalDamage = 'At least one required';
	}

	return errors;
}

export default function HitPointPopup({ renderKey, character }: Props): JSX.Element {
	const [update] = usePartialUpdateCharacterMutation();
	const reduxDispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	return (
		<Dialog onClose={handleClose} open fullWidth maxWidth="xs" PaperProps={{ sx: { position: 'fixed', top: 50 } }}>
			<DialogTitle sx={(theme) => ({ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary })}>
				<Box display="flex" alignItems="center">
					<Box flexGrow={1}>Manage HP</Box>
					<Box>
						<IconButton onClick={handleClose}>
							<Icon className="fa-times" sx={{ fontSize: 16, color: 'text.secondary' }} />
						</IconButton>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={{ mutation: 'damage' }}
					validate={validate}
					onSubmit={(values: HitpointsMutation) => {
						let lethalDamage: number;
						let nonlethalDamage: number;
						if (values.mutation === 'heal') {
							if (values.lethalDamage) {
								lethalDamage = Math.max(character.lethalDamage - values.lethalDamage, 0);
								nonlethalDamage = Math.max(character.nonlethalDamage - values.lethalDamage, 0);
							} else if (values.nonlethalDamage) {
								nonlethalDamage = Math.max(character.nonlethalDamage - values.nonlethalDamage, 0);
							}
						} else if (values.mutation === 'damage') {
							if (values.lethalDamage) lethalDamage = character.lethalDamage + values.lethalDamage;
							if (values.nonlethalDamage) nonlethalDamage = character.nonlethalDamage + values.nonlethalDamage;
						}
						update({
							id: character.id,
							lethalDamage,
							nonlethalDamage
						});
						handleClose();
					}}
				>
					<Form id="hitPointPopup">
						<HitPointPopupForm />
					</Form>
				</Formik>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					Cancel
				</Button>
				<Button variant="contained" color="primary" type="submit" form="hitPointPopup">
					Apply
				</Button>
			</DialogActions>
		</Dialog>
	);
}
