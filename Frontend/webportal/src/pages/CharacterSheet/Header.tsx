import { useAuth0 } from '@auth0/auth0-react';
import { Icon, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import map from 'lodash/map';

import { useGetCharacterQuery } from '../../services/api';
import { globalRender } from '../../services/globalRenderSlice';
import { Character } from '../../types/Character';
import { CharacterSheetData } from '../../types/CharacterSheetData';
import { useAppDispatch } from '../../utils/hooks';
import HitPointPopup from './HitPointPopup';
import PoolPopup from './PoolPopup';

interface Props {
	character: Character;
	characterSheetData: CharacterSheetData;
}

function Header({ character, characterSheetData }: Props): JSX.Element {
	const { refetch } = useGetCharacterQuery(character.id);
	const { user } = useAuth0();
	const reduxDispatch = useAppDispatch();

	function showHitPointPopup() {
		reduxDispatch(globalRender({ key: 'hitpointPopup', component: <HitPointPopup renderKey="hitpointPopup" character={character} /> }));
	}

	function showPoolPopup(poolName: string) {
		reduxDispatch(
			globalRender({
				key: `poolPopUp_${poolName}`,
				component: <PoolPopup renderKey={`poolPopUp_${poolName}`} character={character} poolName={poolName} />
			})
		);
	}

	return (
		<Grid container spacing={1} borderRadius={2} pb={1}>
			<Grid item xs={1} display="flex" alignItems="center" justifyContent="center">
				<Avatar src={characterSheetData.image} />
			</Grid>
			<Grid item md={1} display="flex" alignItems="center">
				<Typography fontSize={25} fontWeight="bold">
					{characterSheetData.name}
				</Typography>
			</Grid>
			<Grid
				item
				xs={2}
				display="flex"
				alignItems="center"
				onClick={character.user.userId === user.sub ? showHitPointPopup : undefined}
				sx={character.user.userId === user.sub ? { cursor: 'pointer' } : undefined}
			>
				<Grid container columns={2} boxShadow={3} justifyContent="center">
					<Grid
						item
						xs={2}
						borderBottom="1px solid"
						sx={(theme) => ({
							borderBottomColor: theme.palette.secondary.main
						})}
					>
						<Typography textAlign="center" fontSize={10}>
							Hit points
						</Typography>
					</Grid>
					<Grid item xs={1} pb="1px">
						<Grid container columns={5} alignItems="center" justifyContent="center" pl={1} pt="3px">
							<Grid item xs={2}>
								<Typography fontSize={11} textAlign="center">
									L
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography fontSize={11} textAlign="center">
									{characterSheetData.maxHp - characterSheetData.lethalDamage}
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography fontSize={11} textAlign="center">
									NL
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography fontSize={11} textAlign="center">
									{characterSheetData.maxHp - characterSheetData.nonlethalDamage}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={1}
						borderLeft="1px solid"
						sx={(theme) => ({
							borderLeftColor: theme.palette.secondary.main
						})}
					>
						<Typography fontSize={25} textAlign="center">
							{characterSheetData.maxHp}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			{map(characterSheetData.pools, (pool) => (
				<Grid
					key={`pool_${pool.name}`}
					item
					xs={2}
					onClick={character.user.userId === user.sub ? () => showPoolPopup(pool.name) : undefined}
					sx={character.user.userId === user.sub ? { cursor: 'pointer' } : undefined}
				>
					<Grid container columns={2} boxShadow={3} justifyContent="center" alignItems="center">
						<Grid
							item
							xs={2}
							borderBottom="1px solid"
							sx={(theme) => ({
								borderBottomColor: theme.palette.secondary.main
							})}
						>
							<Typography textAlign="center" fontSize={10}>
								{pool.name}
							</Typography>
						</Grid>
						<Grid
							item
							xs={1}
							borderRight="1px solid"
							sx={(theme) => ({
								borderRightColor: theme.palette.secondary.main
							})}
						>
							<Typography fontSize={25} textAlign="center">
								{pool.remaining}
							</Typography>
						</Grid>
						<Grid item xs={1}>
							<Typography fontSize={25} textAlign="center">
								{pool.total}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			))}
			<Grid xs display="flex" justifyContent="flex-end" alignItems="center">
				<IconButton color="primary" onClick={refetch}>
					<Icon className="fa-rotate" />
				</IconButton>
			</Grid>
		</Grid>
	);
}

export default Header;
