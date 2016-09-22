module.exports = ($) => {
	let shower = $.dicter.shower;

	let show = (p) => { return $.dicter.shower[p[0]][p[1]]; };

	let showTarget = (skill, role, sf) => {
		if(role.info.target == 1)
			return shower.skillTarget[skill.info.target || sf.info.target];
		else
			return shower.roleTarget[role.info.target];
	};

	return {
		1: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[1]+~~p[2]/1000*card.info.max.level), crit = (serv == 'jp'? p[7] / 10: p[7]);

			return `${target} | ${p[5]}回${show(p[8])}元素的${show(p[9])}攻击
				| <kqud title="等级成长：${p[1]}+${p[2]/1000}*等级">${base}</kqud>+${p[3]/10}%${show(p[6])}
				${(crit != 15 ? ' | '+~~crit+'%高暴击率' : '')}`;
		},
		2: false,
		3: false,
		4: false,
		5: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 回复HP | 造成伤害的${p[1]}%`;
		},
		6: (serv, card, skill, role) => {
			let p = role.params;

			return `附加伤害 | <kqud title="最大值：${show(p[3])}的${p[4]}%">每回合累计损失HP的${p[1]}%</kqud>`;
		},
		7: (serv, card, skill, role) => {
			let p = role.params;

			return `附加伤害 | <kqud title="等价于 无视目标对应防御的${p[1]}%">目标对应防御的${p[1]}%</kqud>`;
		},
		8: (serv, card, skill, role) => {
			let p = role.params;

			return `附加伤害 | 当前${show(p[5])}的${p[3]/10}%`;
		},
		9: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[1]+~~p[2]/1000*card.info.max.level);

			return `${target} | 回复HP | <kqud title="等级成长：${p[1]}+${p[2]/1000}*等级">${base}</kqud>+
				${p[3]/10}%${show(p[5])}`;
		},
		10: false,
		11: false,
		12: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 回复HP | ${show(p[1])}的${p[2]/10}%`;
		},
		13: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[2]+~~p[3]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合
				| <kqud title="发动时机：回合开始前">持续回复HP</kqud>
				| <kqud title="等级成长：${p[2]}+${p[3]/1000}*等级">${base}</kqud>+
				${p[4]/10}%${show(p[6])}`;
		},
		14: false,
		15: false,
		16: false,
		17: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])}
				| ${p[6]}+${p[4]/10}%${show(p[3])}点`;
		},
		18: false,
		19: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])}
				| <kqud title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</kqud>点`;
		},
		20: false,
		21:	false,
		22: false,
		23: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])}
				| ${p[6]}+${p[4]/10}%${show(p[3])}`;
		},
		24: 'DEF_UP_BY_TARGET_PARAM',
		25: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])}
				| <kqud title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</kqud>点`;
		},
		26: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);


			return `${target} | 血量降低 | 当前HP的${p[1]}%`;
		},
		27: 'BUFF_RELEASE',
		28: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 降低${show(p[2])}
				| ${p[6]}+${p[4]/10}%${show(p[3])}`;
		},
		29: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 降低${show(p[2])}
				| <kqud title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</kqud>点`;
		},
		30: 'GUARD_BREAK_BY_SELF_PARAM',
		31: 'GUARD_BREAK_BY_TARGET_PARAM',
		32: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 降低${show(p[2])}
				| <kqud title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</kqud>点`;
		},
		33: 'DAMAGE_DOWN',
		34: 'UNDERMINE',
		35: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 打断行动 | 机率${p[2]}%`;
		},
		36: 'SILENCE',
		37: 'CHARM',
		38: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 毒 | ${p[5]/10}+${p[6]/10}%${show(p[8])}`;
		},
		39: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 燃烧 | ${p[5]/10}+${p[6]/10}%${show(p[8])}`;
		},
		40: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 冻结 | ${p[5]/10}+${p[6]/10}%${show(p[8])}`;
		},
		41: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 裂风 | ${p[5]/10}+${p[6]/10}%${show(p[8])}`;
		},
		42: 'STEAL',
		43: 'REWRITE',
		44: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 抽卡+${p[1]}`;
		},
		45: 'NONE',
		46: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let db, db1 = show(p[3]) , db2 = show(p[4]);

			if(db2 && db1 != db2) db = `${db1}、${db2}`;
			else db = db1;

			return `${target} | 解除${db}状态`;
		},
		47: 'BUFF_RELEASE_ONE',
		48: 'CARD_SEAL',
		49: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升封印抗性 | ${p[2]}%`;
		},
		50: 'CARD_SEAL_RECOVERY',
		51: 'OUTPUT_TEXT',
		52: 'BUFF_RELEASE_RANDOM',
		53: 'DEBUFF_RELEASE_RANDOM',
		54: 'BUFF_RELEASE_OLD',
		55: 'DEBUFF_RELEASE_OLD',
		56: 'DESTRUCT',
		57: 'REVIVE',
		58: 'ATTR_RATE_DOWN_INVALID',
		59: 'ATTR_HIDE',
		60: () => { return '免疫元素克制'; },
		61: (serv, card, skill, role, skillFirst) => {
			let target = showTarget(skill, role, skillFirst);

			if(role.params[1] != 9999) _l('New Params Skill 61');

			return `${target} | 显示自身的元素`;
		},
		62: 'ENEMY_AI_TRIGGER_FLAG_SET',
		63: 'ATTACK_BARRIER',
		64: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			if(p[4][1] || p[5][1] != 3) _l('New Params Skill 64');

			return `${target} | ${p[1]}回合 | 使敌方攻击指向自身 | 减免所受伤害的${p[2]/10}%`;
		},
		65: 'ROLE_OP_COMBO',
		66: 'ATK_UP_FIXED_ATTR_BONUS',
		67: 'DEF_UP_FIXED_ATTR_BONUS',
		68: 'FIELD_ATTR_UP',
		69: 'FIELD_ATTR_DOWN',
		70: 'FIELD_SKILL_UP',
		71: 'FIELD_HEAL_UP',
		72: 'FIELD_HEAL_DOWN',
		73: 'FIELD_JAMMING_UP',
		74: 'FIELD_SUPPORT_DEFENCE_UP',
		75: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 附加伤害 | 所受伤害的${p[2]/10}%`;
		},
		76: 'BUFF_RELEASE_ONE_NUM',
		77: 'DEBUFF_RELEASE_ONE_NUM',
		78: 'PARAM_UP_BUFF_CONVERT',
		79: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | <kqud title="发动条件：处于${show(p[6])}状态">${show(p[6])}</kqud>
				| 回合+${p[1]} | 伤害提升${p[2]}%`;
		},
		80: 'HEAL_REVERSE',
		81: 'ATK_UP_BY_NOW_TURN_DAMAGE',
		82: 'DEF_UP_BY_NOW_TURN_DAMAGE',
		83: 'ATK_BREAK_BY_NOW_TURN_DAMAGE',
		84: 'GUARD_BREAK_BY_NOW_TURN_DAMAGE',
		85: 'ATK_OP_NOW_TURN_REVENGE',
		86: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst), crit = (serv == 'jp'? p[2] / 10: p[2]);

			return `${target} | ${p[1]}回合 | 提升暴击率 | ${crit}%`;
		},
		87: 'DEAL_PENALTY',
		88: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 感电 | ${p[5]/10}+${p[6]/10}%${show(p[8])}`;
		},
		89: 'DARKNESS_RANDOM',
		90: 'DARKNESS_APPOINT',
		91: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升黑暗抗性 | ${p[2]}%`;
		},
		92: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let num = (p[2] == p[3] ? p[2]: p[2]+'~'+p[3]);

			if(p[5] || p[6] || p[7]) _l('');

			return `${target} | ${p[1]}回合 | 陷阱 | ${num}张
				| <kqud title="时机：我方卡牌全部发动后，敌方行动前">使用后受到伤害${p[4]}点</kqud>`;
		},
		93: 'CARD_TRAP_DOT',
		94: 'COST_BLOCK',
		95: 'DEAL_PENALTY_TURN_APPOINT',
		96: 'CRITICAL_UP_BY_SUPPORT',
		97: 'ROLE_VALUE_UP_BY_ROLE_OP',
		98: 'DECK_COMBO_RATE_UP',
		99: 'DEBUFF_REGIST',
		100: 'DEBUFF_REGIST_CARD',
		101: 'NEED_COST_DOWN',
		102: 'ROLE_VALUE_UP_BY_PVP_RATE',
		103: 'ATK_UP_FIXED_PARAM_UNIQUE',
		104: 'DEF_UP_FIXED_PARAM_UNIQUE',
		105: 'ATK_UP_FIXED_SUPPORT',
		106: 'DEF_UP_FIXED_SUPPORT',
		107: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[2] + ~~p[5] * card.info.max.level);

			return `${target} | ${p[1]}回合 | 追加${show(p[6])}元素伤害
				| <kqud title="等级成长：${p[2]}+${p[5]}*等级">${base}</kqud>点`;
		},
		108: 'ENEMY_AWAKE_FLAG_SET',
		109: 'FORCE_BATTLE_END',
		110: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4] + ~~p[5] / 1000 * card.info.max.level);

			return `${target} | ${p[1]}回合 | 提升${show(p[6])}元素耐性
				| <kqud title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</kqud>点`;
		},
		111: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[4] + ~~p[5] / 1000 * card.info.max.level);

			return `${target} | ${p[1]}回合 | 降低${show(p[6])}元素耐性
				| <kqud title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</kqud>点`;
		},
		112: 'ATTR_DEF_UP_SUPPORT',
		113: (serv, card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.ceil(~~p[2] / 100 + ~~p[3] / 100 * card.info.max.level);

			return `${target} | ${p[1]}回合 | 反射伤害
				| 所受伤害的<kqud title="等级成长：${p[2]/100}+${p[3]/100}*等级">${base}</kqud>%`;
		},
		114: 'ATK_OP_REFLECTION_INVALID'
	};

};