import { useNavigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import {
	Alert,
	Box,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	CircularProgress,
	Grid,
	Icon,
	IconButton,
	Typography
} from '@mui/material';
import map from 'lodash/map';

import CharacterEditor from '../components/CharacterEditor';
import CharacterWizard from '../components/CharacterWizard';
import LevelUp from '../components/LevelUp';
import { useDeleteCharacterMutation, useGetCharactersQuery } from '../services/api';
import { globalRender } from '../services/globalRenderSlice';
import { useAppDispatch } from '../utils/hooks';

export default function CharacterSheet(): JSX.Element {
	const { user } = useAuth0();
	const { data, error, isLoading } = useGetCharactersQuery();
	const [deleteCharacter, result] = useDeleteCharacterMutation();
	const navigate = useNavigate();
	const reduxDispatch = useAppDispatch();

	function goToCharacterSheet(id: number) {
		navigate(`./${id}`);
	}

	function addCharacter(): void {
		reduxDispatch(
			globalRender({
				key: 'characterWizard',
				component: <CharacterWizard renderKey="characterWizard" />
			})
		);
	}

	function updateCharacter(entityId: number): void {
		reduxDispatch(
			globalRender({
				key: 'characterEditor',
				component: <CharacterEditor renderKey="characterEditor" entityId={entityId} />
			})
		);
	}

	function levelUp(entityId: number): void {
		reduxDispatch(
			globalRender({
				key: 'levelUp',
				component: <LevelUp renderKey="levelUp" entityId={entityId} />
			})
		);
	}

	return (
		<>
			{isLoading && (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			)}
			{error && <Alert severity="error">An error happened fetching the characters.</Alert>}
			{data && (
				<Grid container spacing={2} columns={{ xs: 1, sm: 2, lg: 12 }}>
					{map(data, (character) => (
						<Grid key={`character_${character.id}`} item xs={1} md={3} display="flex">
							<Box sx={{ position: 'relative', flexGrow: 1 }}>
								<Card sx={{ borderRadius: 3, height: '100%' }}>
									<CardActionArea onClick={() => goToCharacterSheet(character.id)}>
										<CardMedia component="img" height="240" image={character.image} alt={character.name} />
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												{character.name}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{character.characterClass.name}
											</Typography>
										</CardContent>
									</CardActionArea>
									{character.user.userId === user.sub && (
										<CardActions sx={{ justifyContent: 'flex-end' }}>
											<IconButton size="small" onClick={() => levelUp(character.id)}>
												<Icon sx={{ fontSize: 14 }} color="primary" className="fa-arrow-up" />
											</IconButton>
											<IconButton size="small" onClick={() => updateCharacter(character.id)}>
												<Icon sx={{ fontSize: 14 }} color="primary" className="fa-pen-clip" />
											</IconButton>
											<IconButton size="small" onClick={() => deleteCharacter(character.id)}>
												<Icon sx={{ fontSize: 14 }} color="primary" className="fa-trash" />
											</IconButton>
										</CardActions>
									)}
								</Card>
								{result.isLoading && (
									<CircularProgress
										sx={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											marginTop: '-12px',
											marginLeft: '-12px'
										}}
									/>
								)}
							</Box>
						</Grid>
					))}
					<Grid item xs={1} md={3}>
						<Card sx={{ minHeight: 250, height: '100%' }}>
							<CardActionArea sx={{ height: '100%' }} onClick={() => addCharacter()}>
								<CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
									<Icon
										sx={{ width: 'auto', height: 'auto', color: 'primary.dark', fontSize: 120 }}
										className="fa-person-circle-plus"
									/>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			)}
		</>
	);
}
