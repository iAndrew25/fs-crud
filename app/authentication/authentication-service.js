import fetch from 'utils/fetch';

export function login(email, password) {
	return fetch(`/login.php`, {
		method: 'POST',
		body: JSON.stringify({email, password})
	})
}

export function signup(email, name) {
	return fetch(`/signup.php`, {
		method: 'POST',
		body: JSON.stringify({email, name})
	})
}