import {setToken, removeToken} from './tokens';

export const logoutRedirect = (callback = () => {}) => {
	removeToken();
	callback();
}

export const loginRedirect = (token = '', callback = () => {}) => {
	if(token) {
		setToken(token);
		callback();
	}
}