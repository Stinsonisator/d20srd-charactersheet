import { Box, Stack, Typography } from '@mui/material';

export default function Home(): JSX.Element {
	return (
		<Stack m={2} spacing={2}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Typography component="h1" fontSize={30}>
					Morons go princess hunting
				</Typography>
			</Box>
			<Typography>
				Welcome to this attempt for a digital charactersheet. I started this in Excel, but i f***ing hate Excel (blame business users), so
				here we are. It is in no way done and probably never will be. At the moment there is only a black belt implemented. It is in no way
				architecturally sound or a good example of how you should build a webapp. For now it's just a autocalculation of abilities, saves and
				skills. There's no login, no auth at the moment it is just for me.
			</Typography>
		</Stack>
	);
}
