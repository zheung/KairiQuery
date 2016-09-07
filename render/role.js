let shower = dicter.shower;

let show = (p) => { return dicter.shower[p[0]][p[1]]; };

let showTarget = (tarS, tarR) => {
	if(tarR == 1)
		return shower.skillTarget[tarS];
	else
		return shower.roleTarget[tarR];
};

module.exports = {
	1: (card, skill, role) => {
		let p = role.params, target = showTarget(skill.info.target, role.info.target);

		let base = Math.ceil(~~p[1]+~~p[2]/1000*card.info.max.level);

		return `
			${target} | <kqud title="基础伤害：${p[1]}+${p[2]/1000}*等级">${base}</kqud>+
			${p[3]/10}%${show(p[6])} | ${p[5]}回${show(p[8])}属性
			<kqud title="${p[7]}%暴击率 | ${skill.info.chain}%Chain威力">${show(p[9])}攻击</kqud>`;
	},
	7: (card, skill, role) => {
		return `无视${role.params[1]}%防御`;
	}
};