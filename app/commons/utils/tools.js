const months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

export const toMMMMYYYY = (date = new Date().getTime()) => {
	const fullDate = new Date(parseInt(date));

	return `${months[fullDate.getMonth()]} ${fullDate.getFullYear()}`;
}

export const disableEditId = (date = new Date().getTime()) => {
	const now = new Date().getTime(),
		interval = 1000 * 60 * 60 * 24 * 7;

	return !(now > date && now < date + interval);
}

export const disableAddId = () => {
	const today = new Date().getDate();
	console.log("today", today);
	return !(today < 25 && today > 20);
}