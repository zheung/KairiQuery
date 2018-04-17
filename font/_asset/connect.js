import axios from 'axios';

let actions = {
	modules: 'kq3/api/modules'
};

let prefix = '';

export default {
	init: async function() {
		this.req('init');
	},
	conn: async function(action, params) {
		return (await axios.get(prefix + actions[action], {params})).data;
	},
	reg: function(action, path, force) {
		if(force || !actions[action]) {
			actions[action] = path;
		}
	}
};