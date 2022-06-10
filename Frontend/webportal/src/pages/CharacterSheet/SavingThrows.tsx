import { Grid } from '@mui/material';

import CharacterSheetSectionHeader from '../../components/CharacterSheetSectionHeader';
import { Character } from '../../types/Character';
import SavingThrowCard from './SavingThrowCard';

interface Props {
	character: Character;
}

function SavingThrows({ character }: Props): JSX.Element {
	return (
		<Grid container spacing={2} columns={{ xs: 3, md: 1 }}>
			<Grid item xs={3} md={1}>
				<CharacterSheetSectionHeader title="Saves" />
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
