import Grid from '@mui/material/Grid';

import { CharacterSheetData } from '../../types/CharacterSheetData';
import AbilityCard from './AbilityCard';

interface Props {
	character: CharacterSheetData;
}

function Abilities({ character }: Props): JSX.Element {
	return (
		<Grid container spacing={2} justifyContent="space-around">
			<Grid item xs={2} display="flex" justifyContent="center">
				<AbilityCard character={character} ability="strength" />
			</Grid>
			<Grid item xs={2} display="flex" justifyContent="center">
				<AbilityCard character={character} ability="dexterity" />
			</Grid>
			<Grid item xs={2} display="flex" justifyContent="center">
				<AbilityCard character={character} ability="constitution" />
			</Grid>
			<Grid item xs={2} display="flex" justifyContent="center">
				<AbilityCard character={character} ability="intelligence" />
			</Grid>
			<Grid item xs={2} display="flex" justifyContent="center">
				<AbilityCard character={character} ability="wisdom" />
			</Grid>
			<Grid item xs={2} display="flex" justifyContent="center">
				<AbilityCard character={character} ability="charisma" />
			</Grid>
		</Grid>
	);
}

export default Abilities;
