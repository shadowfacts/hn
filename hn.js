function createHN() {
	var req = function(url) {
		return axios.get(url)
			.catch(console.error);
	}

	var endpoint = function(path) {
		return `https://hacker-news.firebaseio.com/v0/${path}`;
	}

	return {
		new: function(start, end) {
			return req(endpoint("newstories.json"))
				.then((res) => {
					if (amount) {
						return res.data.slice(start, end);
					}
					return res.data;
				});
		},
		top: function(start, end) {
			return req(endpoint("topstories.json"))
				.then((res) => {
					return res.data.slice(start, end);
				});
		},
		best: function(start, end) {
			return req(endpoint("beststories.json"))
				.then((res) => {
					return res.data.slice(start, end);
				});
		},
		ask: function(start, end) {
			return req(endpoint("askstories.json"))
				.then((res) => {
					return res.data.slice(start, end);
				});
		},
		show: function(start, end) {
			return req(endpoint("showstories.json"))
				.then((res) => {
					return res.data.slice(start, end);
				});
		},
		jobs: function(start, end) {
			return req(endpoint("jobstories.json"))
				.then((res) => {
					return res.data.slice(start, end);
				});
		},
		item: function(id) {
			return req(endpoint(`item/${id}.json`))
				.then((res) => {
					return res.data;
				});
		},
		user: function(name) {
			return req(endpoint(`user/${name}.json`))
				.then((res) => {
					return res.data;
				});
		}
	};
}

let hn = createHN();