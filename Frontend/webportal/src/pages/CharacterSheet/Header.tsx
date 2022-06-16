import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import map from 'lodash/map';

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
		<Grid
			container
			spacing={1}
			borderRadius={2}
			pb={1}
			sx={(theme) => ({
				backgroundColor: theme.palette.secondary.light,
				color: theme.palette.secondary.contrastText
			})}
		>
			<Grid item xs={1} display="flex" alignItems="center" justifyContent="center">
				<Avatar src={characterSheetData.image} />
			</Grid>
			<Grid item md={1} display="flex" alignItems="center">
				<Typography fontSize={25} fontWeight="bold">
					{characterSheetData.name}
				</Typography>
			</Grid>
			<Grid item xs={2} display="flex" alignItems="center" onClick={showHitPointPopup} sx={{ cursor: 'pointer' }}>
				<Grid container columns={2} borderRadius={2} border="1px solid" justifyContent="center">
					<Grid item xs={2} borderBottom="1px solid">
						<Typography textAlign="center" fontSize={10}>
							Hit points
						</Typography>
					</Grid>
					<Grid item xs={1} pt={0} pb="1px">
						<Grid container columns={5} alignItems="center" justifyContent="center" pl={1} pt="3px">
							<Grid item xs={2}>
								<Typography fontSize={12} textAlign="center">
									L
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography fontSize={12} textAlign="center">
									{characterSheetData.maxHp - characterSheetData.lethalDamage}
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography fontSize={12} textAlign="center">
									NL
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography fontSize={12} textAlign="center">
									{characterSheetData.maxHp - characterSheetData.nonlethalDamage}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={1} borderLeft="1px solid" pl={1}>
						<Typography fontSize={25}>{characterSheetData.maxHp}</Typography>
					</Grid>
				</Grid>
			</Grid>
			{map(characterSheetData.pools, (pool) => (
				<Grid item xs={2} onClick={() => showPoolPopup(pool.name)} sx={{ cursor: 'pointer' }}>
					<Grid container columns={2} border="1px solid" borderRadius={2} justifyContent="center" alignItems="center">
						<Grid item xs={2} borderBottom="1px solid">
							<Typography textAlign="center" fontSize={10}>
								{pool.name}
							</Typography>
						</Grid>
						<Grid item xs={1} borderRight="1px solid">
							<Typography fontSize={25} textAlign="center">
								{pool.remaining}
							</Typography>
						</Grid>
						<Grid item xs={1}>
							<Typography fontSize={25} textAlign="center">
								{pool.remaining}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			))}
		</Grid>
	);
}

export default Header;
