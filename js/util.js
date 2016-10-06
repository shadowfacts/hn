let MILIS = 1;
let SECOND = MILIS * 1000;
let MINUTE = SECOND * 60;
let HOUR = MINUTE * 60;
let DAY = HOUR * 24;
let MONTH = DAY * 30;
let YEAR = DAY * 365;

function ago(time) {
	let delta = Date.now() - (time * 1000);
	if (delta >= YEAR) {
		let years = Math.floor(delta / YEAR);
		return years + " year" + getPluralEnding(years);
	} else if (delta >= MONTH) {
		let months = Math.floor(delta / MONTH);
		return months + " month" + getPluralEnding(months);
	} else if (delta >= DAY) {
		let days = Math.floor(delta / DAY);
		return days + " day" + getPluralEnding(days);
	} else if (delta >= HOUR) {
		let hours = Math.floor(delta / HOUR);
		return hours + " hr" + getPluralEnding(hours);
	} else if (delta >= MINUTE) {
		let minutes = Math.floor(delta / MINUTE);
		return minutes + " min" + getPluralEnding(minutes);
	} else if (delta >= SECOND) {
		let seconds = Math.floor(delta / SECOND);
		return seconds + " sec" + getPluralEnding(seconds);
	} else {
		return delta + " ms";
	}
}

function getPluralEnding(amount) {
	return amount != 1 ? "s" : "";
}