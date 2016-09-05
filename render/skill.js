let show = (p) => { return dicter.show[p[0]][p[1]]; };

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
				let p = role.params;
				true;
				result += `${show(p[8])}属性${show(p[9])}${p[5]}回攻击；伤害计算：(${p[1]}+${p[2]/1000}*等级 + ${p[3]/10}%${show(p[6])})；暴击机率：${p[7]}%`;
			}
			else
				result += '暂未能渲染role.type为'+role.info.type+'的技能\r\n';
		}
	}

	return result;
};