import { useAuth0 } from '@auth0/auth0-react';

import Loader from './components/Loader';
import Login from './pages/Login';
import Portal from './pages/Portal';
import { setAccessTokenSilently } from './services/authentication';

export default function App(): JSX.Element {
	const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();

	setAccessTokenSilently(getAccessTokenSilently);

	if (isAuthenticated) {
		return <Portal />;
	}
	if (isLoading) {
		return <Loader />;
	}
	return <Login />;
}
