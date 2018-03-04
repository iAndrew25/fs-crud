import fetch from './fetch';
import {getToken} from './tokens';

export function getUserData() {
	return fetch(`/users/get.php?tokenId=${getToken()}`, {
		method: 'GET'
	});
}