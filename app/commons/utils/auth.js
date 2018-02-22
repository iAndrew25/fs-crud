import {setToken, removeToken} from './tokens';

export const logoutRedirect = (callback = () => {}) => {
	removeToken();
	callback();
}

export const loginRedirect = (token = '', callback = () => {}) => {
	setToken(token);
	callback();
}