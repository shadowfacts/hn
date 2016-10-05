let list = $("#stories");

load(0, 15);

function load(start, end) {
	topStories(start, end)
		.then((stories) => {
			stories.forEach((id) => {
				item(id)
					.then((item) => {
						list.append(createItem(item));
					});
			});
		})
}

function createItem(item) {
	return `
<li>
	<div class="story">
		<section class="left">
			<span class="title">${item.title}</span>
			<br>
			<span class="domain">${getDomain(item.url)}</span>
		</section>
		<section class="right">
			<span class="time">16h</span>
			<br>
			<span class="votes">${item.score}</span>
			<span class="comments">${item.kids.length}</span>
		</section>
	</div>
</li>
`;
}

function getDomain(url) {
	let afterProtocol = url.split("://")[1];
	let parts = afterProtocol.split("/");
	let domain = parts[0];
	if (domain.startsWith("www.")) {
		return domain.substring(4);
	} else {
		return domain;
	}
}