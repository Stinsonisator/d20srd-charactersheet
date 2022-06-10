import { useMemo } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import ActionButton from '../../components/ActionButton';
import CharacterSheetSectionHeader from '../../components/CharacterSheetSectionHeader';
import { globalRender } from '../../services/globalRenderSlice';
import { Character } from '../../types/Character';
import { useAppDispatch } from '../../utils/hooks';
import MoneyPopup from './MoneyPopup';
import { Coin } from './MoneyPopup/MoneyPopup';

interface Props {
	character: Character;
}

function Money({ character }: Props): JSX.Element {
	const reduxDispatch = useAppDispatch();

	function mutateMoney(mutation: 'gain' | 'lose', coin: Coin): void {
		reduxDispatch(
			globalRender({
				key: 'mutateMoney',
				component: <MoneyPopup renderKey="mutateMoney" mutation={mutation} character={character} coin={coin} />
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
			<Box display="flex" pr={8}>
				<ActionButton color="success" onClick={() => mutateMoney('gain', 'copper')} iconClassName="fa-plus" />
				<ActionButton color="error" onClick={() => mutateMoney('lose', 'copper')} iconClassName="fa-minus" />
				<Typography>Copper</Typography>
				<Box flexGrow={1} />
				<Typography>{character.copper}</Typography>
			</Box>
			<Box display="flex" pr={8}>
				<ActionButton color="success" onClick={() => mutateMoney('gain', 'silver')} iconClassName="fa-plus" />
				<ActionButton color="error" onClick={() => mutateMoney('lose', 'silver')} iconClassName="fa-minus" />
				<Typography>Silver</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="10px">{character.silver}</Typography>
			</Box>
			<Box display="flex" pr={8}>
				<ActionButton color="success" onClick={() => mutateMoney('gain', 'gold')} iconClassName="fa-plus" />
				<ActionButton color="error" onClick={() => mutateMoney('lose', 'gold')} iconClassName="fa-minus" />
				<Typography>Gold</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="20px">{character.gold}</Typography>
			</Box>
			<Box display="flex" pr={8}>
				<ActionButton color="success" onClick={() => mutateMoney('gain', 'platinum')} iconClassName="fa-plus" />
				<ActionButton color="error" onClick={() => mutateMoney('lose', 'platinum')} iconClassName="fa-minus" />
				<Typography>Platinum</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="30px">{character.platinum}</Typography>
			</Box>
			<Box display="flex" px={8} border="1px solid" borderRadius={1}>
				<Typography>Total</Typography>
				<Box flexGrow={1} />
				<Typography marginRight="-2px">{total.toFixed(2)}</Typography>
			</Box>
		</Stack>
	);
}

export default Money;
