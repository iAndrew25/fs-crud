import fetch from '../../commons/utils/fetch';
import {getToken} from '../../commons/utils/tokens';

export function getUserIds() {
	return fetch(`/ids/get.php?tokenId=${getToken()}`, {
		method: 'GET'
	});
}

export function setUserIds(ids) {
	return fetch(`/ids/set.php?tokenId=${getToken()}`, {
		method: 'POST',
		body: JSON.stringify(ids)
	});
}