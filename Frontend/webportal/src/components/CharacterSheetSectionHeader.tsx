import { Box, Typography } from '@mui/material';

interface Props {
	title: string;
}

function CharacterSheetSectionHeader({ title }: Props): JSX.Element {
	return (
		<Box py={1} display="flex" justifyContent="center" borderRadius={2} sx={(theme) => ({ backgroundColor: theme.palette.secondary.light })}>
			<Typography>{title}</Typography>
		</Box>
	);
}

export default CharacterSheetSectionHeader;
