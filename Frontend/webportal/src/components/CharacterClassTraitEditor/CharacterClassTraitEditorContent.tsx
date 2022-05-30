import { useEffect, useRef } from 'react';

import { Grid, MenuItem, TextField } from '@mui/material';
import { useFormikContext } from 'formik';

import { CharacterClassTrait } from '../../types/CharacterClass';
import AbilityAdjustmentRule from './AbilityAdjustmentRule';
import BaseAttackBonusRule from './BaseAttackBonusRule';
import SavingThrowModifiersRule from './SavingThrowModifiersRule';

function CharacterClassTraitEditorContent() {
	const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext<CharacterClassTrait>();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current?.focus();
	}, []);

	function getTraitType(traitToCheck: CharacterClassTrait): 'abilityAdjustment' | 'baseAttackBonus' | 'savingThrowModifiers' {
		if ('ability' in traitToCheck.rule) {
			return 'abilityAdjustment';
		} else if ('baseAttackBonus' in traitToCheck.rule) {
			return 'baseAttackBonus';
		}
		return 'savingThrowModifiers';
	}

	return (
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
								break;
							case 'baseAttackBonus':
								setFieldValue('rule', {
									baseAttackBonus: 0
								});
								break;
							case 'savingThrowModifiers':
								setFieldValue('rule', {
									fortitude: 0,
									reflex: 0,
									will: 0
								});
								break;
						}
					}}
					required
				>
					<MenuItem value="abilityAdjustment">Ability adjustment</MenuItem>
					<MenuItem value="baseAttackBonus">Base attack bonus</MenuItem>
					<MenuItem value="savingThrowModifiers">Saving throw modifiers</MenuItem>
				</TextField>
			</Grid>
			{
				{
					abilityAdjustment: <AbilityAdjustmentRule />,
					baseAttackBonus: <BaseAttackBonusRule />,
					savingThrowModifiers: <SavingThrowModifiersRule />
				}[getTraitType(values)]
			}
		</Grid>
	);
}

export default CharacterClassTraitEditorContent;
