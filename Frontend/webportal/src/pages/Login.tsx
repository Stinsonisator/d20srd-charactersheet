import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Stack } from '@mui/material';

function Login() {
	const { loginWithPopup } = useAuth0();

	return (
		<Box
			height="100%"
			width="100%"
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={(theme) => ({
				backgroundColor: '#e3f2fd'
			})}
		>
			<Stack spacing={2} p={5} borderRadius={10} sx={{ backgroundColor: 'white' }}>
				<Box>
					<img src="/images/ff-logo.png" width={500} alt="FF Logo" />
				</Box>
				<Box>
					<img src="/images/dnd-logo.png" width={500} alt="D&D Logo" />
				</Box>
				<Box>
					<Button fullWidth variant="contained" onClick={() => loginWithPopup().then(() => window.location.reload())}>
						Login
					</Button>
				</Box>
			</Stack>
		</Box>
	);
}

export default Login;
