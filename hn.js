function newStories(start, end) {
	return req(endpoint("newstories.json"))
		.then((res) => {
			if (amount) {
				return res.data.splice(start, end);
			}
			return res.data;
		});
}

function topStories(start, end) {
	return req(endpoint("topstories.json"))
		.then((res) => {
			return res.data.splice(start, end);
		});
}

function bestStories(start, end) {
	return req(endpoint("beststories.json"))
		.then((res) => {
			return res.data.splice(start, end);
		});
}

function askStories(start, end) {
	return req(endpoint("askstories.json"))
		.then((res) => {
			return res.data.splice(start, end);
		});
}

function showStories(start, end) {
	return req(endpoint("showstories.json"))
		.then((res) => {
			return res.data.splice(start, end);
		});
}

function jobStories(start, end) {
	return req(endpoint("jobstories.json"))
		.then((res) => {
			return res.data.splice(start, end);
		});
}

function item(id) {
	return req(endpoint(`item/${id}.json`))
		.then((res) => {
			return res.data;
		});
}

function user(name) {
	return req(endpoint(`user/${name}.json`))
		.then((res) => {
			return res.data;
		});
}

function req(url) {
	return axios.get(url)
		.catch(console.error);
}

function endpoint(path) {
	return `https://hacker-news.firebaseio.com/v0/${path}`;
}