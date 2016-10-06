var loaded = 0;

loadPosts();

function loadPosts() {
	let list = $("#stories");

	$("#more").click(() => {
		load(loaded);
	});

	load(loaded);
}

function load(start) {
	loaded += 15;

	let list = $("#stories");

	let loadFunc = getLoadFunc();

	loadFunc(start, start + 15)
		.then((stories) => {
			stories.forEach((id) => {
				hn.item(id)
					.then((item) => {
						list.append(createItem(item));
					});
			});
		})
}

function getLoadFunc() {
	let mode = window.location.hash.substring(1).toLowerCase();
	if (mode == "new") {
		return hn.new;
	} else if (mode == "best") {
		return hn.best;
	} else if (mode == "ask") {
		return hn.ask;
	} else if (mode == "show") {
		return hn.show;
	} else if (mode == "jobs") {
		return hn.jobs;
	} else {
		return hn.top;
	}
}

function createItem(item) {
	var kids = function() {
		if (item.kids) {
			return `<span class="comments">${item.kids.length}</span>`;
		} else {
			return "";
		}
	}

	return `
<li>
	<div class="story">
		<section class="left">
			<a href="/story.html#${item.id}">
				<p class="title">${item.title}</p>
				<p class="domain">${getDomain(item.url)}</p>
			</a>
		</section>
		<section class="right">
			<span class="time">${ago(item.time)}</span>
			<br>
			<a href="/comments.html${item.id}">
				<span class="votes">${item.score}</span>
				<span class="comments">${item.kids ? item.kids.length : 0}</span>
			</a>
		</section>
	</div>
</li>
`;
}

function getDomain(url) {
	if (url) {
		let afterProtocol = url.split("://")[1];
		let parts = afterProtocol.split("/");
		let domain = parts[0];
		if (domain.startsWith("www.")) {
			return domain.substring(4);
		} else {
			return domain;
		}
	}
	return "";
}

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
		return Math.floor(delta / YEAR) + " yrs";
	} else if (delta >= MONTH) {
		return Math.floor(delta / MONTH) + " months";
	} else if (delta >= DAY) {
		return Math.floor(delta / DAY) + " days";
	} else if (delta >= HOUR) {
		return Math.floor(delta / HOUR) + " hrs";
	} else if (delta >= MINUTE) {
		return Math.floor(delta / MINUTE) + " min"
	} else if (delta >= SECOND) {
		return Math.floor(delta / SECOND) + " secs";
	} else {
		return delta + " ms";
	}
}
