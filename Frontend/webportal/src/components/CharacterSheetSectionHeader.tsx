import { ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

interface Props {
	leftElement?: ReactNode;
	title: ReactNode;
	rightElement?: ReactNode;
}

function CharacterSheetSectionHeader({ leftElement, title, rightElement }: Props): JSX.Element {
	return (
		<Box
			py={1}
			px={2}
			display="flex"
			justifyContent="space-between"
			borderRadius={2}
			sx={(theme) => ({ backgroundColor: theme.palette.secondary.light })}
		>
			{leftElement || <Box />}
			<Typography>{title}</Typography>
			{rightElement || <Box />}
		</Box>
	);
}

export default CharacterSheetSectionHeader;
