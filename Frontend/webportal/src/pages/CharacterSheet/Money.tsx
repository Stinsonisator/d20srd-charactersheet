import { useMemo } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';

import CharacterSheetSectionHeader from '../../components/CharacterSheetSectionHeader';
import { globalRender } from '../../services/globalRenderSlice';
import { CoinPouch } from '../../types/Money';
import { useAppDispatch } from '../../utils/hooks';
import MoneyPopup from './MoneyPopup';

interface Props {
	character: CoinPouch;
}

function Money({ character }: Props): JSX.Element {
	const reduxDispatch = useAppDispatch();

	function mutateMoney(mutation: 'gain' | 'lose'): void {
		reduxDispatch(
			globalRender({
				key: 'mutateMoney',
				component: <MoneyPopup renderKey="mutateMoney" mutation={mutation} coinPouch={character} />
			})
		);
	}

	const total = useMemo(
		() => (character.copper || 0) / 100 + (character.silver || 0) / 10 + (character.gold || 0) + (character.platinum || 0) * 10,
		[character.copper, character.gold, character.platinum, character.silver]
	);

	return (
		<Stack spacing={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
			<CharacterSheetSectionHeader title="Money" />
			<Box display="flex" px={8}>
				<Typography>Copper</Typography>
				<Box flexGrow={1} />
				<Typography>{character.copper}</Typography>
			</Box>
			<Box display="flex" px={8}>
				<Typography>Silver</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="10px">{character.silver}</Typography>
			</Box>
			<Box display="flex" px={8}>
				<Typography>Gold</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="20px">{character.gold}</Typography>
			</Box>
			<Box display="flex" px={8}>
				<Typography>Platinum</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="30px">{character.platinum}</Typography>
			</Box>
			<Box display="flex" px={8} border="1px solid" borderRadius={1}>
				<Typography>Total</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="-2px">{total.toFixed(2)}</Typography>
			</Box>
			<Box display="flex" px={8} justifyContent="flex-end">
				<Button color="error" variant="outlined" onClick={() => mutateMoney('lose')} sx={{ mr: 1 }}>
					Lose
				</Button>
				<Button color="success" variant="contained" onClick={() => mutateMoney('gain')}>
					Gain
				</Button>
			</Box>
		</Stack>
	);
}

export default Money;
