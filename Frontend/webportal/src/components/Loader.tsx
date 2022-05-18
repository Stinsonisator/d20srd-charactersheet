import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Loader(): JSX.Element {
	return (
		<Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}

export default Loader;
