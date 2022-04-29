import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#659dbd'
		},
		secondary: {
			main: '#fbeec1'
		}
	},
	components: {
		MuiIcon: {
			defaultProps: {
				baseClassName: 'fa-solid'
			}
		},
		MuiTextField: {
			defaultProps: {
				variant: 'standard',
				fullWidth: true
			}
		}
	}
});

export default theme;
