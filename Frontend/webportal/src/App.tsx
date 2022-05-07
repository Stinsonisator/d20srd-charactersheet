import React from 'react';
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';

import { AppBar, Button, Container, GlobalStyles, ThemeProvider, Toolbar, Tooltip, Typography } from '@mui/material';
import map from 'lodash/map';

import Characters from './pages/Characters';
import CharacterSheet from './pages/CharacterSheet';
import Home from './pages/Home';
import MasterData from './pages/MasterData';
import Skills from './pages/Skills';
import theme from './services/theme';
import { useAppSelector } from './utils/hooks';

const globalStyles = (
	<GlobalStyles
		styles={(theme) => ({
			'.MuiToolbar-root': {
				'.MuiButton-root': {
					color: theme.palette.text.secondary,
					'&.active': {
						color: 'white'
					}
				}
			},
			'.MuiDataGrid-columnHeaders': {
				backgroundColor: 'white'
			},
			body: {
				backgroundColor: '#d6d0cc'
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
						<Button component={NavLink} to="/masterdata" color="inherit">
							Masterdata
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
						<Route path="/masterdata" element={<MasterData />} />
						<Route path="/masterdata/skills" element={<Skills />} />
					</Routes>
				</Container>
			</ThemeProvider>
		</HashRouter>
	);
}
