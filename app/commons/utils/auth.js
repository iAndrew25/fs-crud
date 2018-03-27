import {setToken, removeToken} from './tokens';
import {setUser} from './user-data';

export const logoutRedirect = (callback = () => {}) => {
	removeToken();
	callback();
	setUser({});
}

export const loginRedirect = (token = '', callback = () => {}) => {
	if(token) {
		setToken(token);
		callback();
	}
}