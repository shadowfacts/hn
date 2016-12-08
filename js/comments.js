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

	const url = $("<a></a>");
	url.text(item.url);
	url.attr("href", item.url);
	container.append(url);

	const info = $("<p></p>");
	info.html(`by ${item.by}, <a href="https://news.ycombinator.com/item?id=${item.id}" target="_blank">${ago(item.time)} ago</a>, ${item.score} point${getPluralEnding(item.score)}`);
	container.append(info);

	const comments = $("<ul id=\"comments\"></ul>");

	createSubComments(item, 0)
		.then((list) => {
			for (let i = 0; i < list.length; i++) {
				comments.append(list[i]);
			}
		});

	container.append(comments);
}

function createSubComments(item, depth) {
	depth = depth || 1;

	return new Promise((resolve, reject) => {
		if (!item.kids) resolve([]);

		const requests = new Array(item.kids.length);

		for (let i = 0; i < item.kids.length; i++) {
			requests[i] = hn.item(item.kids[i]);
		}

		$.when.apply($, requests).done(function() {
			const comments = new Array(item.kids.length);

			$.each(arguments, (i, data) => {
				comments[i] = createComment(data, depth);
			});

			$.when.apply($, comments).done(function() {
				const rendered = new Array(item.kids.length);

				$.each(arguments, (i, comment) => {
					rendered[i] = comment;
				});

				resolve(rendered);
			});
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
		<p><a href="https://news.ycombinator.com/item?id=${item.id}" target="_blank">${ago(item.time)} ago</a></p>
		<p>[deleted]</p>
	</div>
</li>`;
			}

			return `
<li>
	<div>
		<p>by ${item.by}, <a href="https://news.ycombinator.com/item?id=${item.id}" target="_blank">${ago(item.time)} ago</a></p>
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
	info.text(`by ${item.by}, ${ago(item.time)} ago`);
	container.append(info);

	hn.item(item.parent)
		.then((parent) => {
			info.append(`, on `);

			const link = $(`<a></a>`);
			link.attr("href", `/comments.html#${parent.id}`);
			link.text(parent.type == "story" ? parent.title : "comment");
			link.click((e) => {
				e.preventDefault();
				window.location.href = link.attr("href");
				window.location.reload();
			});
			info.append(link);
		});
}
