import { useEffect, useRef } from 'react';

import { Grid, MenuItem, TextField } from '@mui/material';
import { useFormikContext } from 'formik';

import { CharacterClassTrait } from '../../types/CharacterClass';
import AbilityAdjustmentRule from './AbilityAdjustmentRule';
import BaseAttackBonusRule from './BaseAttackBonusRule';
import FlatPointsPoolRule from './FlatPointsPoolRule';
import PowerPointsPoolRule from './PowerPointsPoolRule';
import SavingThrowModifiersRule from './SavingThrowModifiersRule';

function CharacterClassTraitEditorForm() {
	const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext<CharacterClassTrait>();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current?.focus();
	}, []);

	function getTraitType(
		traitToCheck: CharacterClassTrait
	): 'abilityAdjustment' | 'baseAttackBonus' | 'savingThrowModifiers' | 'flatPointsPool' | 'powerPointsPool' {
		if ('ability' in traitToCheck.rule) {
			return 'abilityAdjustment';
		} else if ('baseAttackBonus' in traitToCheck.rule) {
			return 'baseAttackBonus';
		} else if ('fortitude' in traitToCheck.rule) {
			return 'savingThrowModifiers';
		} else if ('name' in traitToCheck.rule && 'max' in traitToCheck.rule) {
			return 'flatPointsPool';
		}
		return 'powerPointsPool';
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
							case 'flatPointsPool':
								setFieldValue('rule', {
									name: '',
									max: 0
								});
								break;
							case 'powerPointsPool':
								setFieldValue('rule', {
									name: '',
									base: 0,
									keyAbility: 'intelligence'
								});
								break;
						}
					}}
					required
				>
					<MenuItem value="abilityAdjustment">Ability adjustment</MenuItem>
					<MenuItem value="baseAttackBonus">Base attack bonus</MenuItem>
					<MenuItem value="savingThrowModifiers">Saving throw modifiers</MenuItem>
					<MenuItem value="flatPointsPool">Flat points pool</MenuItem>
					<MenuItem value="powerPointsPool">Power points pool</MenuItem>
				</TextField>
			</Grid>
			{
				{
					abilityAdjustment: <AbilityAdjustmentRule />,
					baseAttackBonus: <BaseAttackBonusRule />,
					savingThrowModifiers: <SavingThrowModifiersRule />,
					flatPointsPool: <FlatPointsPoolRule />,
					powerPointsPool: <PowerPointsPoolRule />
				}[getTraitType(values)]
			}
		</Grid>
	);
}

export default CharacterClassTraitEditorForm;
