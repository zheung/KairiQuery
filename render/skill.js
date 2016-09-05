let show = (p) => { return dicter.show[p[0]][p[1]]; };

module.exports = (card) => {
	let result = { awaken: '', normal: '', support: '' },
		skillTypes = ['awaken', 'normal', 'support'],
		skills = card.skill;

	for(let st of skillTypes) {
		for(let skill of skills[st]) {
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
					result[st] += `${p[5]}回${show(p[9])}攻击，${show(p[8])}属性，${p[7]}%暴击机率，${skill.info.chain}%Chain威力<br>伤害值：${Math.ceil(~~p[1]+~~p[2]/1000*card.info.max.level)}(${p[1]}+${p[2]/1000}*等级) + ${p[3]/10}%${show(p[6])}<br>`;
				}
				else
					result[st] += '暂未渲染技能'+role.info.type+'&gt;_&lt;<br>';
			}
		}

	}

	return result || '无';
};