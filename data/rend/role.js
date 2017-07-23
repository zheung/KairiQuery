module.exports = async(serv) => {
	let show = (p) => { return shower[p[0]][p[1]]; };

	let showTarget = (skill, role, sf) => {
		if(role.target == 1)
			return shower.skillTarget[skill.info.target || sf.info.target];
		else
			return shower.roleTarget[role.target];
	};

	return {
		1: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[1]+~~p[2]/1000*card.info.max.level);

			return `${target} | ${p[5]}回${show(p[8])}元素的${show(p[9])}攻击 |\x20
				${base ? `<samp title="等级成长：${p[1]}+${p[2]/1000}*等级">${base}</samp>+` : ''}
				${show(p[6])}的${p[3]/10}%
				${(p[7] / (serv=='ps'?1:10) != 15 ? ` | ${~~p[7] / 10}%高暴击率` : '')}`;
		},
		5: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 恢复生命 | 造成伤害的${p[1]}%`;
		},
		7: async(card, skill, role) => {
			let p = role.params;

			return `附加伤害 | 累计损失生命的${p[1]}% | 上限：${show(p[3])}的${p[4]}%`;
		},
		9: async(card, skill, role) => {
			let p = role.params;

			return `附加伤害 | <samp title="等价于 无视目标对应防御的${p[1]}%">目标对应防御的${p[1]}%</samp>`;
		},
		10: async(card, skill, role) => {
			let p = role.params;

			return `附加伤害 | ${show(p[5])}的${p[3]/10}%`;
		},
		12: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[1]+~~p[2]/1000*card.info.max.level);

			return `${target} | 恢复生命 | ${base ? `<samp title="等级成长：${p[1]}+${p[2]/1000}*等级">${base}</samp>+` : ''}
				${show(p[5])}的${p[3]/10}%`;
		},
		15: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 恢复生命 | ${show(p[1])}的${p[2]/10}%`;
		},
		16: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[2]+~~p[3]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 |\x20
				<samp title="发动时机：回合开始前">持续恢复生命</samp> |\x20
				<samp title="等级成长：${p[2]}+${p[3]/1000}*等级">${base}</samp>+
				${p[4]/10}%${show(p[6])}`;
		},
		21: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
				<samp title="等级成长：${p[6]}*等级">${p[6]*card.info.max.level}</samp>+${show(p[3])}的${p[4]/10}%`;
		},
		23: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
				<samp title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		26: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升${show(p[4])}${show(p[5])}伤害 | ${p[2]/10}%`;
		},
		37: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[5]/1000+~~p[6]*card.info.max.level);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
				<samp title="等级成长：${p[5]/1000}+${p[6]}*等级">${base}</samp>+${p[4]/10}%${show(p[3])}`;
		},
		39: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
				<samp title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		41: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 受到伤害的${p[4]}% | 转换为${show(p[2])} | 上限：${p[5]}`;
		},
		49: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 生命降低 | 当前生命的${p[1]}%`;
		},
		50: async(card, skill, role, skillFirst) => {
			let target = showTarget(skill, role, skillFirst);

			if(~~role.params[1] < 100 || ~~role.params[2] > 0) L('New Role Param', role.type, 'Card', card.id, 'Skill', skill.id, 'Role', role.id);

			return `${target} | 解除所有BUFF`;
		},
		55: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 降低${show(p[2])} |\x20
				${p[6]}+${p[4]/10}%${show(p[3])}`;
		},
		56: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 降低${show(p[2])} |\x20
				<samp title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		60: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 降低${show(p[2])} |\x20
				<samp title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		64: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 打断行动 | 机率${p[2]}%`;
		},
		67: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 毒 | ${Math.ceil(p[5]/10)}+${p[6]/10}%${show(p[8])}`;
		},
		68: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 燃烧 | ${Math.ceil(p[5]/10)}+${p[6]/10}%${show(p[8])}`;
		},
		69: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 冻结 | ${Math.ceil(p[5]/10)}+${p[6]/10}%${show(p[8])}`;
		},
		70: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 裂风 | ${Math.ceil(p[5]/10)}+${p[6]/10}%${show(p[8])}`;
		},
		81: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 属性变更 | ${show(p[2])}`;
		},
		82: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 抽卡+${p[1]}`;
		},
		28: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let db, db1 = show(p[3]) , db2 = show(p[4]);

			if(db2 && db1 != db2) db = `${db1}、${db2}`;
			else db = db1;

			return `${target} | 解除${db}状态`;
		},
		42: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升封印抗性 | ${p[2]}%`;
		},
		11: () => { return '免疫元素克制'; },
		87: async(card, skill, role, skillFirst) => {
			let target = showTarget(skill, role, skillFirst);

			if(role.params[1] != 9999) L('New Params Skill 61');

			return `${target} | 显示自身的元素`;
		},
		43: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | ${p[4]}层 | ${show(p[5])}护盾 | 伤害${p[2]}点以下无效化`;
		},
		45: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			if(p[4][1] || p[5][1] != 3) L('New Params Skill 64');

			return `${target} | ${p[1]}回合 | 使敌方攻击指向自身 | 减免所受伤害的${p[2]/10}%`;
		},
		74: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 附加伤害 | 所受伤害的${p[2]/10}%`;
		},
		91: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | <samp title="发动条件：处于${show(p[6])}状态">${show(p[6])}</samp> |\x20
				回合+${p[1]} | 伤害提升${p[2]}%`;
		},
		34: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升暴击率 | ${p[2] / 10}%`;
		},
		92: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 抽卡-${p[1]}`;
		},
		72: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 感电 | ${Math.ceil(p[5]/10)}+${p[6]/10}%${show(p[8])}`;
		},
		46: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升黑暗抗性 | ${p[2]}%`;
		},
		77: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let num = (p[2] == p[3] ? p[2]: `${p[2]}~${p[3]}`);

			if(~~p[5] || ~~p[6] || ~~p[7]) L('miao?');

			return `${target} | ${p[1]}回合 | 陷阱 | ${num}张 |\x20
				<samp title="时机：我方卡牌全部发动后，敌方行动前">使用后受到伤害${p[4]}点</samp>`;
		},
		76: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | COST封印 | ${p[2]}点`;
		},
		35: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[2] + ~~p[5] * card.info.max.level);

			return `${target} | ${p[1]}回合 | 追加${show(p[6])}元素伤害 |\x20
				<samp title="等级成长：${p[2]}+${p[5]}*等级">${base}</samp>点`;
		},
		113: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4] + ~~p[5] / 1000 * card.info.max.level);

			return `${target} | ${p[1]}回合 | 提升${show(p[6])}元素耐性 |\x20
				<samp title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		112: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4] + ~~p[5] / 1000 * card.info.max.level);

			return `${target} | ${p[1]}回合 | 降低${show(p[6])}元素耐性 |\x20
				<samp title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		117: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[2] / 100 + ~~p[3] / 100 * card.info.max.level);

			return `${target} | ${p[1]}回合 | 反射伤害 |\x20
				所受伤害的<samp title="等级成长：${p[2]/100}+${p[3]/100}*等级">${base}</samp>%`;
		},
		125: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp> | 提升${show(p[7])}伤害 | ${p[2] / 10}%`;
		},
		126: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp> | 提升${show(p[7])}支援效果 | ${p[4] / 10}%`;
		},
		127: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp> | 提升${show(p[7])}效果 | ${p[4] / 10}%`;
		},
		128: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp> | 提升${show(p[7])}弱化效果 | ${p[4] / 10}%`;
		},
		129: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp> | 提升${show(p[7])}弱化效果 | ${p[4] / 10}%`;
		},
		130: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp> | 提升治疗效果 | ${p[4] / 10}%`;
		},
		131: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[4]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp> | 提升${show(p[5])}伤害暴击率 | ${p[2] / 10}%`;
		},
		136: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 祝福 | ${p[1]}回合`;
		},
		144: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 提高${show(p[2])}上限 |\x20
				<samp title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		44: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | ${p[4]}层 | ${show(p[6])}元素${show(p[5])}护盾 | 伤害${p[2]}点以下无效化`;
		},
		36: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 减免所受伤害的${p[2]/10}%`;
		}
	};
};