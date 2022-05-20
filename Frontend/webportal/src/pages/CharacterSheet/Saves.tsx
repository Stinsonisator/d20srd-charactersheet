import { Box, Stack, Typography } from '@mui/material';

import { Character } from '../../types/Character';
import SaveCard from './SaveCard';

interface Props {
	character: Character;
}

function Saves({ character }: Props): JSX.Element {
	return (
		<Stack spacing={2}>
			<Box py={1} display="flex" justifyContent="center" borderRadius={2} sx={(theme) => ({ backgroundColor: theme.palette.secondary.light })}>
				<Typography>Saves</Typography>
			</Box>
			<Box>
				<SaveCard character={character} savingThrow="fortitude" />
			</Box>
			<Box>
				<SaveCard character={character} savingThrow="reflex" />
			</Box>
			<Box>
				<SaveCard character={character} savingThrow="will" />
			</Box>
		</Stack>
	);
}

export default Saves;
