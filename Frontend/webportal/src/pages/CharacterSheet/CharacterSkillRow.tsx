import { useMemo } from 'react';

import { Checkbox, Grid, Typography } from '@mui/material';

import { Character, CharacterSkill } from '../../types/Character';
import { displayModifier, getAbilityModifier, getFinalScore } from '../../utils';

interface Props {
	character: Character;
	skill: CharacterSkill;
}

function CharacterSkillRow({ character, skill }: Props): JSX.Element {
	const abilityModifier = useMemo(() => {
		let abilityScore: number;

		switch (skill.skill.keyAbility) {
			case 'str':
				abilityScore = character.strength;
				break;
			case 'dex':
				abilityScore = character.dexterity;
				break;
			case 'con':
				abilityScore = character.constitution;
				break;
			case 'int':
				abilityScore = character.intelligence;
				break;
			case 'wis':
				abilityScore = character.wisdom;
				break;
			case 'cha':
				abilityScore = character.charisma;
				break;
		}
		return getAbilityModifier(getFinalScore(character.characterClass, skill.skill.keyAbility, abilityScore));
	}, [character.characterClass, character.charisma, character.constitution, character.dexterity, character.intelligence, character.strength, character.wisdom, skill.skill.keyAbility]);

	const countAsClassSkill = skill.countAsClassSkill;
	const points = skill.points;

	const skillModifier = useMemo(() => {
		if (countAsClassSkill) {
			return points ?? 0;
		}
		return Math.floor((points ?? 0) / 2);
	}, [countAsClassSkill, points]);

	const canUse = skill.skill.untrained || (skill.points ?? 0) > 0;
	return (
		<>
			<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', opacity: canUse ? 1 : 0.3 }}>
				<Typography>{skill.skill.name}</Typography>
			</Grid>
			<Grid item xs={2} sx={{ opacity: canUse ? 1 : 0.5 }}>
				<Checkbox checked={skill.skill.untrained} />
			</Grid>
			<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', opacity: canUse ? 1 : 0.3 }}>
				<Typography>{canUse ? displayModifier(abilityModifier + skillModifier) : '/'}</Typography>
			</Grid>
			<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', opacity: canUse ? 1 : 0.3 }}>
				<Typography>{displayModifier(abilityModifier)}</Typography>
			</Grid>
			<Grid item xs={2} sx={{ opacity: canUse ? 1 : 0.5 }}>
				<Checkbox checked={skill.countAsClassSkill} />
			</Grid>
			<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', opacity: canUse ? 1 : 0.3 }}>
				<Typography>{skill.points}</Typography>
			</Grid>
		</>
	);
}

export default CharacterSkillRow;
