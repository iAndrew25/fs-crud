const months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

export const toMMMMYYYY = (date = new Date().getTime()) => {
	const fullDate = new Date(parseInt(date));

	return `${months[fullDate.getMonth()]} ${fullDate.getFullYear()}`;
}

export const disableEditId = (date = new Date().getTime()) => {
	const now = new Date().getTime(),
		interval = 1000 * 60 * 60 * 24 * 7;

	return false;
	return !(now > date && now < date + interval);
}

export const disableAddId = () => {
	const today = new Date().getDate();

	return false;
	return !(today < 25 && today > 20);
}

export const sortByDate = (arr = []) => arr.sort((a, b) => b.created_date - a.created_date);

export const sortByMonth = (arr = []) => {
	return arr.reduce((total, item) => {
		const currentDate = toMMMMYYYY(item.created_date);
		if(total[currentDate]) {
			total[currentDate].push(item)
		} else {
			total[currentDate] = [item]
		}
		return total;
	}, {});
}