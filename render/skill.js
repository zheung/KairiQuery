module.exports = (skills) => {
	let result = '';

	for(let skill of skills) {
		if(skill.cond.type) {
			true;
		}

		if(skill.delay.cond) {
			true;
		}


		for(let role of skill.role) {
			if(role.info.type == 1) {
				true;
			}
		}
	}

	return result;
};