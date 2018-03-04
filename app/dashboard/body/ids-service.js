import fetch from '../../commons/utils/fetch';
import {getToken} from '../../commons/utils/tokens';

export function getUserIds() {
	return fetch(`/ids/get.php?tokenId=${getToken()}`, {
		method: 'GET'
	});
}

export function setUserIds({user_id, ck, csb, cbb, hk, hsb, hbb, created_date, token, mode}) {
	return fetch(`/ids/set.php`, {
		method: 'POST',
		body: JSON.stringify({user_id, ck, csb, cbb, hk, hsb, hbb, created_date, token, mode})
	});
}