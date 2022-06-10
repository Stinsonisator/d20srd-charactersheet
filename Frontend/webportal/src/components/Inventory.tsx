import { Stack, TextField } from '@mui/material';
import { useFormikContext } from 'formik';

import { Character } from '../types/Character';

function Inventory(): JSX.Element {
	const { values, handleChange } = useFormikContext<Character>();

	return (
		<Stack my={2} spacing={2}>
			<TextField id="copper" name="copper" label="Copper" type="number" value={values.copper} onChange={handleChange} />
			<TextField id="silver" name="silver" label="Silver" type="number" value={values.silver} onChange={handleChange} />
			<TextField id="gold" name="gold" label="Gold" type="number" value={values.gold} onChange={handleChange} />
			<TextField id="platinum" name="platinum" label="Platinum" type="number" value={values.platinum} onChange={handleChange} />
		</Stack>
	);
}

export default Inventory;
