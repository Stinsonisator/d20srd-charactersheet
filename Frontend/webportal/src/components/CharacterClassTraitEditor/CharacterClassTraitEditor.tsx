import { useCallback, useEffect, useRef } from 'react';

import { Grid, MenuItem, TextField } from '@mui/material';
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
import AbilityAdjustmentRule from './AbilityAdjustmentRule';

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
	if ('ability' in values.rule) {
		if (!values.rule.ability) {
			errors.rule.ability = 'Required';
		}
		if (!values.rule.adjustment) {
			errors.rule.ability = 'Required';
		}
	}

	return errors;
}

function CharacterClassTraitEditor({ renderKey, characterClassId, trait, saveTrait }: Props) {
	const firstField = useRef<HTMLInputElement>();
	const reduxDispatch = useDispatch();

	useEffect(() => {
		firstField.current?.focus();
	}, []);

	const handleClose = useCallback(() => {
		reduxDispatch(globalDerender(renderKey));
	}, [reduxDispatch, renderKey]);

	function getTraitType(traitToCheck: CharacterClassTrait): string {
		if ('ability' in traitToCheck.rule) {
			return 'abilityAdjustment';
		}
		return 'abilityAdjustment';
	}

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
					{({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
						<Form id="traitEditor">
							<Grid container spacing={2} sx={{ my: 2 }}>
								<Grid item xs={6}>
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
								</Grid>
								<Grid item xs={6}>
									<TextField
										id="level"
										name="level"
										label="Level"
										value={values.level}
										type="number"
										inputProps={{ min: 1, max: 20 }}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.level && Boolean(errors.level)}
										helperText={touched.level && errors.level}
										required
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="Trait type"
										value={getTraitType(values)}
										select
										onChange={(event) => {
											switch (event.target.value) {
												case 'abilityAdjustment':
												default:
													setFieldValue('rule', {
														ability: 'strength',
														adjustment: 0
													});
											}
										}}
										required
									>
										<MenuItem value="abilityAdjustment">Ability adjustment</MenuItem>
									</TextField>
								</Grid>
								{
									{
										abilityAdjustment: <AbilityAdjustmentRule />
									}[getTraitType(values)]
								}
							</Grid>
						</Form>
					)}
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
