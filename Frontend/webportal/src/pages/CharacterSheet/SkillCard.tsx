import { useMemo } from 'react';

import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Character } from '../../types/Character';
import { Skill } from '../../types/Skill';
import { displayModifier, getSkillModifier } from '../../utils';

interface Props {
	character: Character;
	skill: Skill;
}

function SkillCard({ character, skill }: Props): JSX.Element {
	const skillModifier = useMemo(() => getSkillModifier(character, skill), [character, skill]);

	return (
		<Paper sx={{ width: '100%' }}>
			<Box py={1} display="flex" flexDirection="row" justifyContent="space-around" sx={{ opacity: skillModifier !== null ? 1 : 0.3 }}>
				<Typography pl={2} flexGrow={1}>
					{skill.name}
				</Typography>
				<Typography width={40}>{skillModifier !== null ? displayModifier(skillModifier) : '/'}</Typography>
			</Box>
		</Paper>
	);
}

export default SkillCard;
