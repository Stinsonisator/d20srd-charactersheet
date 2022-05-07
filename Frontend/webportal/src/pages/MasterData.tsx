import { Link } from 'react-router-dom';

import { Grid, Icon, Stack, Typography } from '@mui/material';

function MasterData() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={2}>
				<Link to={'/masterdata/skills'}>
					<Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, backgroundColor: 'white' }}>
						<Icon sx={{ width: 'auto', height: 'auto', color: 'primary.dark', fontSize: 70 }} className="fa-book" />
						<Typography>Skills</Typography>
					</Stack>
				</Link>
			</Grid>
		</Grid>
	);
}

export default MasterData;
