const MILIS = 1;
const SECOND = MILIS * 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

function ago(time) {
	const delta = Date.now() - (time * 1000);
	if (delta >= YEAR) {
		const years = Math.floor(delta / YEAR);
		return years + " year" + getPluralEnding(years);
	} else if (delta >= MONTH) {
		const months = Math.floor(delta / MONTH);
		return months + " month" + getPluralEnding(months);
	} else if (delta >= DAY) {
		const days = Math.floor(delta / DAY);
		return days + " day" + getPluralEnding(days);
	} else if (delta >= HOUR) {
		const hours = Math.floor(delta / HOUR);
		return hours + " hr" + getPluralEnding(hours);
	} else if (delta >= MINUTE) {
		const minutes = Math.floor(delta / MINUTE);
		return minutes + " min" + getPluralEnding(minutes);
	} else if (delta >= SECOND) {
		const seconds = Math.floor(delta / SECOND);
		return seconds + " sec" + getPluralEnding(seconds);
	} else {
		return delta + " ms";
	}
}

function getPluralEnding(amount) {
	return amount != 1 ? "s" : "";
}