import { FormControl, InputLabel, Typography } from '@mui/material';

interface Props {
	label: string;
	value: string;
}

function ReadOnlyField({ label, value }: Props): JSX.Element {
	return (
		<FormControl sx={{ mt: 1 }}>
			<InputLabel shrink>{label}</InputLabel>
			<Typography sx={{ color: 'black', mt: 1.8, ml: 2 }}>{value}</Typography>
		</FormControl>
	);
}

export default ReadOnlyField;
