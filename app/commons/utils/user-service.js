import fetch from './fetch';
import {getToken} from './tokens';

export function getUserData() {
	return fetch(`/users/me.php?tokenId=${getToken()}`, {
		method: 'GET'
	});
}