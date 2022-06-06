import { GetTokenSilentlyOptions } from '@auth0/auth0-react';

let getAccessTokenSilently: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>;

function setAccessTokenSilently(func: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>) {
	getAccessTokenSilently = func;
}

export { getAccessTokenSilently, setAccessTokenSilently };
