module.exports = async(serv, card) => {
	let rdrRole = require('./role');

	let result = {};

	let skills = card.skill;

	let skillTypes = {
		// pass: skills.pass,
		active1: skills.active1.role,
		active2: skills.active2.role,
		active3: skills.active3.role
	};

	for(let skillType in skillTypes) {
		let ss = [];
		let skillFirst = skillTypes[skillType][0];

		for(let skill of skillTypes[skillType]) {
			let s = { content: [], name: skill.info.name };

			let condType = skill.cond.type;
			let condType2 = skill.cond2 ? skill.cond2.type : undefined;
			let delayType = skill.delay ? skill.delay.type : undefined;

			if(condType || condType2 || delayType) {
				L('卧槽传承技能有条件？', condType, condType2, delayType, 'Card', card.id, 'Skill', skill.id);
			}

			s.cond = ['无'];

			let roleFirst = skill.role[0];

			for(let role of skill.role) {
				let skillType = role.type, rend = (await rdrRole(serv))[skillType];

				if(skillType == 'BLESS') {
					L('卧槽传承技能有祝福？');
				}

				if(rend instanceof Function) {
					let chain1 = roleFirst.chain;
					let chain2 = role.chain;
					let chain = chain2 || chain1;

					let text = (await rend(card, skill, role, skillFirst)).replace(/\t|\n/g, '');

					if(chain != 20 && chain != 0 && chain != 1)
						text += ` | ${chain}连携 | `;
						// text += ` | <samp title="Chain威力计算规则：\r\n1、影响HP的技能(物理、魔法、治疗)：每Chain增加总数值的${chain}%点\r\n2、影响属性的技能(防御、弱化、支援)：每Chain增加${chain}点\r\n3、基于某一属性计算的技能：每Chain增加${chain}%该属性数值">高连携</> | ${chain}`;

					s.content.push(text);
				}
				else {
					L('New Role', skillType, 'Card', card.id, 'Skill', skill.id);

					s.content.push('~未渲染技能' + skillType);
				}
			}

			ss.push(s);
		}

		result[skillType] = ss.sort((a, b) => { return a.prio - b.prio; });
	}

	return result;
};