let loaded = 0;

loadPosts();

function loadPosts() {
	const list = $("#stories");

	$("#more").click(() => {
		load(loaded);
	});

	load(loaded);
}

function load(start) {
	loaded += 15;

	const list = $("#stories");

	const loadFunc = getLoadFunc();

	loadFunc(start, start + 15)
		.then((ids) => {
			const requests = new Array(ids.length);
			const stories = new Array(ids.length);
			
			for (let i = 0; i < ids.length; i++) {
				requests[i] = hn.item(ids[i]);
			}

			$.when.apply($, requests).done(function() {
				$.each(arguments, (i, data) => {
					stories[i] = createItem(data);
				});

				for (let i = 0; i < stories.length; i++) {
					list.append(stories[i]);
				}
			});
		})
}

function getLoadFunc() {
	const query = window.location.search;
	const mode = query.length == 0 ? "top" : query.substring(6);
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
	} else if (mode == "top") {
		return hn.top;
	}
}

function createItem(item) {
	const kids = function() {
		if (item.kids) {
			return `<span class="comments">${item.kids.length}</span>`;
		} else {
			return "";
		}
	}

	return `
<li>
	<div class="story">
		<a href="${item.url}" target="_blank">
			<section class="left">
				<p class="title">${item.title}</p>
				<p class="domain">${getDomain(item.url)}</p>
			</section>
		</a>
		<a href="/comments.html?id=${item.id}">
			<section class="right">
				<span class="time">${ago(item.time)}</span>
				<br>
				<span class="votes">${item.score}</span>
				<span class="comments">${item.kids ? item.kids.length : 0}</span>
			</section>
		</a>
	</div>
</li>
`;
}

function getDomain(url) {
	if (url) {
		const afterProtocol = url.split("://")[1];
		const parts = afterProtocol.split("/");
		const domain = parts[0];
		if (domain.startsWith("www.")) {
			return domain.substring(4);
		} else {
			return domain;
		}
	}
	return "";
}
