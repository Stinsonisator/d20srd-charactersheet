import React, { useRef, useState } from 'react';
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Avatar, Box, Button, Container, GlobalStyles, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import map from 'lodash/map';

import { useAppSelector } from '../utils/hooks';
import CharacterClasses from './CharacterClasses';
import Characters from './Characters';
import CharacterSheet from './CharacterSheet';
import Home from './Home';
import MasterData from './MasterData';
import Skills from './Skills';

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
			}
		})}
	/>
);

function Portal() {
	const { user, logout } = useAuth0();
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const globalComponents = useAppSelector((state) => state.globalComponents.components);
	const userButtonRef = useRef<HTMLButtonElement>();

	return (
		<HashRouter>
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
					<Box flexGrow={1} />
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton ref={userButtonRef} onClick={() => setUserMenuOpen(true)}>
								<Avatar alt={user.nickname} src={user.picture} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={userButtonRef.current}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={userMenuOpen}
							onClose={() => setUserMenuOpen(false)}
						>
							<MenuItem onClick={() => logout()}>
								<Typography textAlign="center">Log out</Typography>
							</MenuItem>
						</Menu>
					</Box>
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
					<Route path="/masterdata/characterclasses" element={<CharacterClasses />} />
				</Routes>
			</Container>
		</HashRouter>
	);
}

export default Portal;
