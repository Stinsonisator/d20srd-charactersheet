import { useMemo } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Stack, Typography } from '@mui/material';

import CharacterSheetSectionHeader from '../../components/CharacterSheetSectionHeader';
import { globalRender } from '../../services/globalRenderSlice';
import { CoinPouch } from '../../types/Money';
import { useAppDispatch } from '../../utils/hooks';
import MoneyPopup from './MoneyPopup';

interface Props {
	character: CoinPouch & { user?: { userId: string } };
}

function Money({ character }: Props): JSX.Element {
	const { user } = useAuth0();
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
			<Box display="flex" px={2}>
				<Typography>Copper</Typography>
				<Box flexGrow={1} />
				<Typography>{character.copper}</Typography>
			</Box>
			<Box display="flex" px={2}>
				<Typography>Silver</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="10px">{character.silver}</Typography>
			</Box>
			<Box display="flex" px={2}>
				<Typography>Gold</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="20px">{character.gold}</Typography>
			</Box>
			<Box display="flex" px={2}>
				<Typography>Platinum</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="30px">{character.platinum}</Typography>
			</Box>
			<Box display="flex" px={2} border="1px solid" borderRadius={1}>
				<Typography>Total</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="-2px">{total.toFixed(2)}</Typography>
			</Box>
			{character.user.userId === user.sub && (
				<Box display="flex" px={2} justifyContent="flex-end">
					<Button color="error" variant="outlined" onClick={() => mutateMoney('lose')} sx={{ mr: 1 }}>
						Lose
					</Button>
					<Button color="success" variant="contained" onClick={() => mutateMoney('gain')}>
						Gain
					</Button>
				</Box>
			)}
		</Stack>
	);
}

export default Money;
