import fetch from '../commons/utils/fetch';

export function login(email, password) {
	return fetch(`/login.php`, {
		method: 'POST',
		body: JSON.stringify({email, password})
	})
}

export function lostPassword(email) {
	return fetch(`/users/lost-password.php`, {
		method: 'POST',
		body: JSON.stringify({email})
	})
}