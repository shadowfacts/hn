loadItem();

function loadItem() {
	const hash = window.location.hash.substring(1);
	hn.item(hash)
		.then((item) => {
			if (item.type == "story") {
				showStory(item);
			} else if (item.type == "comment") {
				showComment(item);
			}
		});
}

function showStory(item) {
	const container = $("#container");

	const title = $("<h1></h1>");
	title.text(item.title);
	container.append(title);

	if (item.text) {
		const text = $("<p></p>");
		text.html(item.text);
		container.append(text);
	}

	if (item.url) {
		const url = $("<a></a>");
		url.text(item.url);
		url.attr("href", item.url);
		url.attr("target", "_blank");
		container.append(url);
	}

	const info = $("<p></p>");
	info.html(`<a href="/comments.html#${item.id}" onclick="internalLink(event, this">${ago(item.time)} ago</a> by ${item.by}, ${item.score} point${getPluralEnding(item.score)}, <a href="https://news.ycombinator.com/item?id=${item.id}" target="_blank">on HN</a>`);
	container.append(info);

	const comments = $("<ul id=\"comments\"></ul>");

	createSubComments(item, 1)
		.then((list) => {
			for (let i = 0; i < list.length; i++) {
				comments.append(list[i]);
			}
		});

	container.append(comments);
}

function createSubComments(item, depth) {
	return new Promise((resolve, reject) => {
		if (!item.kids) resolve([]);
		if (depth > 4) {
			resolve([`
<li>
	<div>
		<p class="details">
			<a href="/comments.html#${item.id}" onclick="internalLink(event, this)">More...</a>
		</p>
	</div>
</li>`]);
		}

		const comments = new Array(item.kids.length);

		for (let i = 0; i < item.kids.length; i++) {
			comments[i] = hn.item(item.kids[i]).then(createComment);
		}

		$.when.apply($, comments).done(function() {
			const rendered = new Array(item.kids.length);

			$.each(arguments, (i, comment) => {
				rendered[i] = comment;
			});

			resolve(rendered);
		});
	});
}

function createComment(item, depth) {
	return createSubComments(item, depth + 1)
		.then((children) => {
			let rendered = "";

			for (let i = 0; i < children.length; i++) {
				rendered += children[i];
			}

			if (!item.by || !item.text) {
				return `
<li>
	<div>
		<p class="details">${ago(item.time)} ago</p>
		<p>[deleted]</p>
	</div>
</li>`;
			}

			return `
<li>
	<div>
		<p class="details"><a href="/comments.html#${item.id}" onclick="internalLink(event, this)">${ago(item.time)} ago</a> by ${item.by}, <a href="https://news.ycombinator.com/item?id=${item.id}" target="_blank">on HN</a></p>
		<p>${item.text}</p>
		<ul class="children">
			${rendered}
		</ul>
	</div>
</li>`;
		});
}

function showComment(item) {
	const container = $("#container");

	const text = $("<p></p>");
	text.html(item.text);
	container.append(text);

	const info = $("<p></p>");
	info.html(`${ago(item.time)} ago by ${item.by}, <a href="https://news.ycombinator.com/item?id=${item.id}" target="_blank">on HN</a>`);
	container.append(info);

	hn.item(item.parent)
		.then((parent) => {
			info.append(`, on `);

			const link = $(`<a></a>`);
			link.attr("href", `/comments.html#${parent.id}`);
			link.text(parent.type == "story" ? parent.title : "comment");
			link.click((e) => {
				internalLink(e, link);
			});
			info.append(link);
		});

	const comments = $("<ul id=\"comments\"></ul>");

	createSubComments(item, 1)
		.then((list) => {
			for (let i = 0; i < list.length; i++) {
				comments.append(list[i]);
			}
		});

	container.append(comments);
}

function internalLink(event, el) {
	event.preventDefault();
	el = $(el);
	window.location.href = el.attr("href");
	window.location.reload();
}