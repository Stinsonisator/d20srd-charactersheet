import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';

import { useAddCharacterLevelMutation } from '../services/api';
import { globalDerender } from '../services/globalRenderSlice';
import { CharacterLevel } from '../types/Character';
import { useAppDispatch } from '../utils/hooks';
import Loader from './Loader';

interface Props {
	renderKey: string;
	entityId: number;
}

function LevelUp({ renderKey, entityId }: Props) {
	const [add, result] = useAddCharacterLevelMutation();
	const reduxDispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	return (
		<>
			{result.isLoading && <Loader />}
			<Dialog onClose={handleClose} open fullWidth maxWidth="sm">
				<DialogTitle sx={(theme) => ({ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary })}>
					<Box display="flex" alignItems="center">
						<Box flexGrow={1}>Level up</Box>
						<Box>
							<IconButton onClick={handleClose}>
								<Icon className="fa-times" sx={{ fontSize: 16, color: 'text.secondary' }} />
							</IconButton>
						</Box>
					</Box>
				</DialogTitle>
				<DialogContent>
					<Formik
						initialValues={{
							id: 0,
							hp: 0,
							characterId: entityId
						}}
						onSubmit={(values: CharacterLevel) => {
							add(values);
						}}
					>
						{({ handleChange, values }) => (
							<Form id="levelUp">
								<TextField
									id="hp"
									name="hp"
									label="HP"
									type="number"
									value={values.hp}
									onChange={handleChange}
									required
									sx={{ my: 2 }}
								/>
							</Form>
						)}
					</Formik>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined">
						Cancel
					</Button>
					<Button variant="contained" color="primary" type="submit" form="levelUp">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default LevelUp;
