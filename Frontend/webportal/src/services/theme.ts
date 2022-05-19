import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#479deb'
		},
		secondary: {
			main: '#a1a1a1'
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
				fullWidth: true,
				variant: 'standard'
			}
		},
		MuiSelect: {
			defaultProps: {
				variant: 'standard'
			}
		},
		MuiFormControl: {
			defaultProps: {
				fullWidth: true
			}
		}
	}
});

export default theme;
