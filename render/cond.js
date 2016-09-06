module.exports = {
	1: skill => {
		if(~~skill.cond.param1>0)
			return `${skill.cond.param1}Chain或以上`;
		else
			return`${skill.cond.param2}Chain或以下`;
	},
	10: skill => {
		if(~~skill.cond.param1>0)
			return `${skill.cond.param1}回合或以上`;
		else
			return `${skill.cond.param2}回合或以下`;
	}
};