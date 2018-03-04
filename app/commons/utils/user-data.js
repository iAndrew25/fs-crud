let user = {
	email: 'a@a.a',
	name: 'Burebista',
	id: 1
};

export const setUser = userData => user = userData;
export const getUser = _ => Object.keys(user).length ? user : null;