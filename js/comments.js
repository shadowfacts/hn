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
	info.text(`by ${item.by}, ${ago(item.time)} ago, ${item.score} point${getPluralEnding(item.score)}`);
	container.append(info);

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
