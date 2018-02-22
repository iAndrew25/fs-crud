let user = {};

export const setUser = userData => user = userData;
export const getUser = _ => Object.keys(user).length ? user : null;