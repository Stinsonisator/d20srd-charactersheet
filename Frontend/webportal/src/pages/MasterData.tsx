import { Link } from 'react-router-dom';

import { Grid, Icon, Stack, Typography } from '@mui/material';

function MasterData() {
	return (
		<Grid container spacing={2} columns={{ xs: 2, md: 6, lg: 12 }}>
			<Grid item xs={2}>
				<Link to={'/masterdata/skills'} style={{ textDecoration: 'none' }}>
					<Stack
						spacing={1}
						sx={(theme) => ({
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: 200,
							backgroundColor: theme.palette.text.secondary,
							color: theme.palette.text.primary,
							borderRadius: 3
						})}
					>
						<Icon sx={{ width: 'auto', height: 'auto', color: 'text.primary', fontSize: 70 }} className="fa-book" />
						<Typography>Skills</Typography>
					</Stack>
				</Link>
			</Grid>
		</Grid>
	);
}

export default MasterData;
