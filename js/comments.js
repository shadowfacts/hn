loadItem();

function loadItem() {
	let hash = window.location.hash.substring(1);
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
	let container = $("#container");

	let title = $("<h1></h1>");
	title.text(item.title);
	container.append(title);

	let url = $("<a></a>");
	url.text(item.url);
	url.attr("href", item.url);
	container.append(url);

	let info = $("<p></p>");
	info.text(`by ${item.by}, ${ago(item.time)} ago, ${item.score} point${getPluralEnding(item.score)}`);
	container.append(info);

}

function showComment(item) {
	let container = $("#container");

	let text = $("<p></p>");
	text.html(item.text);
	container.append(text);

	let info = $("<p></p>");
	info.text(`by ${item.by}, ${ago(item.time)} ago`);
	container.append(info);

	hn.item(item.parent)
		.then((parent) => {
			info.append(`, on `);

			let link = $(`<a></a>`);
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
