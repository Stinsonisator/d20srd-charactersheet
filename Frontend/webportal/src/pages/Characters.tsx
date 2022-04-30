import { useNavigate } from 'react-router-dom';

import { Alert, Box, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Grid, Icon, IconButton, Typography } from '@mui/material';
import map from 'lodash/map';

import CharacterWizard from '../components/CharacterWizard';
import { useGetCharactersQuery } from '../services/api';
import { globalRender } from '../services/globalRenderSlice';
import { useAppDispatch } from '../utils/hooks';

export default function CharacterSheet(): JSX.Element {
	const { data, error, isLoading } = useGetCharactersQuery();
	const navigate = useNavigate();
	const reduxDispatch = useAppDispatch();

	function goToCharacterSheet(id: number) {
		navigate(`./${id}`);
	}

	function addCharacter(): void {
		reduxDispatch(
			globalRender({
				key: 'test',
				component: <CharacterWizard renderKey="test" />
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
				<Grid container spacing={2}>
					{map(data, (character) => (
						<Grid key={`character_${character.id}`} item xs={3}>
							<Card>
								<CardActionArea onClick={() => goToCharacterSheet(character.id)}>
									<CardMedia component="img" height="240" image="https://ih1.redbubble.net/image.846676006.1552/st,small,845x845-pad,1000x1000,f8f8f8.u3.jpg" alt={character.name} />
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											{character.name}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{character.class}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions sx={{ justifyContent: 'flex-end' }}>
									<IconButton size="small">
										<Icon sx={{ fontSize: 14 }} color="primary" className="fa-pen-clip" />
									</IconButton>
									<IconButton size="small">
										<Icon sx={{ fontSize: 14 }} color="primary" className="fa-trash" />
									</IconButton>
								</CardActions>
							</Card>
						</Grid>
					))}
					<Grid item xs={3}>
						<Card sx={{ minHeight: 250, height: '100%' }}>
							<CardActionArea sx={{ height: '100%' }} onClick={() => addCharacter()}>
								<CardContent sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
									<Icon sx={{ width: 'auto', height: 'auto', color: 'primary.dark', fontSize: 60 }} className="fa-person-circle-plus" />
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			)}
		</>
	);
}
