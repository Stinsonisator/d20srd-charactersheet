import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#040C0E'
		},
		secondary: {
			main: '#132226'
		},
		text: {
			primary: '#040C0E',
			secondary: '#a4978e'
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
