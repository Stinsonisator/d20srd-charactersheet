import React from 'react';
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';

import { AppBar, Button, Container, GlobalStyles, ThemeProvider, Toolbar, Tooltip, Typography } from '@mui/material';
import map from 'lodash/map';

import Characters from './pages/Characters';
import CharacterSheet from './pages/CharacterSheet';
import Home from './pages/Home';
import theme from './services/theme';
import { useAppSelector } from './utils/hooks';

const globalStyles = (
	<GlobalStyles
		styles={(theme) => ({
			'.MuiButton-root': {
				'&.active': {
					color: theme.palette.secondary.main
				}
			}
		})}
	/>
);

export default function App(): JSX.Element {
	const globalComponents = useAppSelector((state) => state.globalComponents.components);

	return (
		<HashRouter>
			<ThemeProvider theme={theme}>
				{globalStyles}
				<AppBar position="sticky">
					<Toolbar>
						<Tooltip title="Morons go princess hunting aka Aljosha's fault">
							<Typography variant="h6" sx={{ mr: 10 }}>
								MGPH
							</Typography>
						</Tooltip>
						<Button component={NavLink} to="/" color="inherit">
							Home
						</Button>
						<Button component={NavLink} to="/characters" color="inherit">
							Characters
						</Button>
					</Toolbar>
				</AppBar>
				{map(globalComponents, (component, key) => (
					<React.Fragment key={key}>{component}</React.Fragment>
				))}
				<Container sx={{ p: 2 }}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/characters" element={<Characters />} />
						<Route path="/characters/:id" element={<CharacterSheet />} />
					</Routes>
				</Container>
			</ThemeProvider>
		</HashRouter>
	);
}
