import { Box, Grid, Typography } from '@mui/material';

import { Character } from '../../types/Character';
import SavingThrowCard from './SavingThrowCard';

interface Props {
	character: Character;
}

function SavingThrows({ character }: Props): JSX.Element {
	return (
		<Grid container spacing={2} columns={{ xs: 3, md: 1 }}>
			<Grid item xs={3} md={1}>
				<Box
					py={1}
					display="flex"
					justifyContent="center"
					borderRadius={2}
					sx={(theme) => ({ backgroundColor: theme.palette.secondary.light })}
				>
					<Typography>Saves</Typography>
				</Box>
			</Grid>
			<Grid item xs={1}>
				<SavingThrowCard character={character} savingThrow="fortitude" />
			</Grid>
			<Grid item xs={1}>
				<SavingThrowCard character={character} savingThrow="reflex" />
			</Grid>
			<Grid item xs={1}>
				<SavingThrowCard character={character} savingThrow="will" />
			</Grid>
		</Grid>
	);
}

export default SavingThrows;
