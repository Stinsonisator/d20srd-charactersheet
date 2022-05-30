import { useMemo } from 'react';

import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import startCase from 'lodash/startCase';

import { SavingThrowModifiers } from '../../types/BusinessRule';
import { Character } from '../../types/Character';
import { displayModifier, getSavingThrowModifier } from '../../utils';

interface Props {
	character: Character;
	savingThrow: keyof SavingThrowModifiers;
}

function SavingThrowCard({ character, savingThrow }: Props): JSX.Element {
	const savingThrowModifier = useMemo(() => getSavingThrowModifier(character, savingThrow), [character, savingThrow]);

	return (
		<Paper sx={{ width: '100%' }}>
			<Box py={1} display="flex" flexDirection="row" justifyContent="space-around" sx={{ opacity: savingThrowModifier !== null ? 1 : 0.3 }}>
				<Typography pl={2} flexGrow={1}>
					{startCase(savingThrow)}
				</Typography>
				<Typography width={40}>{savingThrowModifier !== null ? displayModifier(savingThrowModifier) : '/'}</Typography>
			</Box>
		</Paper>
	);
}

export default SavingThrowCard;
