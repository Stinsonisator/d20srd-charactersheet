import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';

import { AppBar, Button, Container, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { Provider } from 'react-redux';

import Characters from './pages/Characters';
import CharacterSheet from './pages/CharacterSheet';
import Home from './pages/Home';
import { store } from './services/store';
import theme from './services/theme';

import './assets/main.css';

export default function App(): JSX.Element {
	return (
		<HashRouter>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<AppBar position="sticky">
						<Toolbar>
							<Typography variant="h6" sx={{ mr: 10 }}>
								MGPH
							</Typography>
							<Button component={NavLink} to="/" color="inherit">
								Home
							</Button>
							<Button component={NavLink} to="/characters" color="inherit">
								Characters
							</Button>
						</Toolbar>
					</AppBar>
					<Container sx={{ p: 2 }}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/characters" element={<Characters />} />
							<Route path="/characters/:id" element={<CharacterSheet />} />
						</Routes>
					</Container>
				</ThemeProvider>
			</Provider>
		</HashRouter>
	);
}
