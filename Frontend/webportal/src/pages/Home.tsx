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
				here we are. It is in no way done and probably never will be. It is also in no way architecturally sound or a good example of how you
				should build a webapp. For now it's just a autocalculation of abilities, saves and skills, an HP tracker and a money tracker. The
				login is provided by auth0. It is not thoroughly tested, I will provide no support whatsoever and I am in no way responsible for what
				happens to your game if you use this tools
			</Typography>
			<Typography mt={3}>Happy hunting!</Typography>
		</Stack>
	);
}
