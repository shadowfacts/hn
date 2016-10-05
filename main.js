var loaded = 0;
let hash = window.location.hash.substring(1);

if (hash.length != 0 && !isNaN(hash)) { // viewing an item
	displayItem(hash);
} else { // display posts list
	loadPosts();
}

function displayItem(id) {
	hn.item(id)
		.then((item) => {
			// TODO: me
		});
}

function loadPosts() {
	let list = $("<ul></ul>");
	list.attr("id", "stories");
	list.appendTo(document.body);

	let btn = $("<button></button>");
	btn.attr("id", "more");
	btn.text("More...");
	btn.appendTo(document.body);
	btn.click(() => {
		load(loaded);
	});

	load(loaded);
	// TODO: go to next page
}

function load(start) {
	loaded += 15;

	let list = $("#stories");

	hn.top(start, start + 15)
		.then((stories) => {
			stories.forEach((id) => {
				hn.item(id)
					.then((item) => {
						list.append(createItem(item));
					});
			});
		})
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
			<p class="title">${item.title}</p>
			<p class="domain">${getDomain(item.url)}</p>
		</section>
		<section class="right">
			<span class="time">${ago(item.time)}</span>
			<br>
			<span class="votes">${item.score}</span>
			<span class="comments">${item.kids ? item.kids.length : 0}</span>
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