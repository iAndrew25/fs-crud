import fetch from './fetch';
import {getToken} from './tokens';

export function getUserData() {
	return fetch(`/users/get.php?tokenId=${getToken()}`, {
		method: 'GET'
	});
}

export function getAllUsersData() {
	return fetch(`/users/get-all.php?tokenId=${getToken()}`, {
		method: 'GET'
	});
}

export function setUserData({name, email, password, phone, id, mode}) {
	return fetch(`/users/set.php?tokenId=${getToken()}`, {
		method: 'POST',
		body: JSON.stringify({name, email, password, phone, id, mode})
	});
}