module.exports = ($) => {
	return (serv) => {
		let shower = $.dicts[serv].shower;

		let show = (p) => { return shower[p[0]][p[1]]; };

		let showTarget = (skill, role, sf) => {
			if(role.target == 1)
				return shower.skillTarget[skill.info.target || sf.info.target];
			else
				return shower.roleTarget[role.target];
		};

		return {
			1: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[1]+~~p[2]/1000*card.info.max.level);

				return `${target} | ${p[5]}回${show(p[8])}元素的${show(p[9])}攻击 |\x20
					${base ? `<kqud title="等级成长：${p[1]}+${p[2]/1000}*等级">${base}</kqud>+` : ''}
					${show(p[6])}的${p[3]/10}%
					${(p[7] != 15 ? ` | ${~~p[7] / 10}%高暴击率` : '')}`;
			},
			2: false,
			3: false,
			4: false,
			5: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | 恢复生命 | 造成伤害的${p[1]}%`;
			},
			6: (card, skill, role) => {
				let p = role.params;

				return `附加伤害 | 累计损失生命的${p[1]}% | 上限：${show(p[3])}的${p[4]}%`;
			},
			7: (card, skill, role) => {
				let p = role.params;

				return `附加伤害 | <kqud title="等价于 无视目标对应防御的${p[1]}%">目标对应防御的${p[1]}%</kqud>`;
			},
			8: (card, skill, role) => {
				let p = role.params;

				return `附加伤害 | ${show(p[5])}的${p[3]/10}%`;
			},
			9: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[1]+~~p[2]/1000*card.info.max.level);

				return `${target} | 恢复生命 | ${base ? `<kqud title="等级成长：${p[1]}+${p[2]/1000}*等级">${base}</kqud>+` : ''}
					${show(p[5])}的${p[3]/10}%`;
			},
			10: false,
			11: false,
			12: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | 恢复生命 | ${show(p[1])}的${p[2]/10}%`;
			},
			13: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[2]+~~p[3]/1000*card.info.max.level);

				return `${target} | ${p[1]}回合 |\x20
					<kqud title="发动时机：回合开始前">持续恢复生命</kqud> |\x20
					<kqud title="等级成长：${p[2]}+${p[3]/1000}*等级">${base}</kqud>+
					${p[4]/10}%${show(p[6])}`;
			},
			14: false,
			15: false,
			16: false,
			17: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
					<kqud title="等级成长：${p[6]}*等级">${p[6]*card.info.max.level}</kqud>+${show(p[3])}的${p[4]/10}%`;
			},
			18: false,
			19: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

				return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
					<kqud title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</kqud>点`;
			},
			20: false,
			21:	false,
			22: false,
			23: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[5]/1000+~~p[6]*card.info.max.level);

				return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
					<kqud title="等级成长：${p[5]/1000}+${p[6]}*等级">${base}</kqud>+${p[4]/10}%${show(p[3])}`;
			},
			24: 'DEF_UP_BY_TARGET_PARAM',
			25: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

				return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
					<kqud title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</kqud>点`;
			},
			26: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);


				return `${target} | 生命降低 | 当前生命的${p[1]}%`;
			},
			27: 'BUFF_RELEASE',
			28: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${p[1]}回合 | 降低${show(p[2])} |\x20
					${p[6]}+${p[4]/10}%${show(p[3])}`;
			},
			29: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

				return `${target} | ${p[1]}回合 | 降低${show(p[2])} |\x20
					<kqud title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</kqud>点`;
			},
			30: 'GUARD_BREAK_BY_SELF_PARAM',
			31: 'GUARD_BREAK_BY_TARGET_PARAM',
			32: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

				return `${target} | ${p[1]}回合 | 降低${show(p[2])} |\x20
					<kqud title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</kqud>点`;
			},
			33: 'DAMAGE_DOWN',
			34: 'UNDERMINE',
			35: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | 打断行动 | 机率${p[2]}%`;
			},
			36: 'SILENCE',
			37: 'CHARM',
			38: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${p[1]}回合 | 毒 | ${Math.ceil(p[5]/10)}+${p[6]/10}%${show(p[8])}`;
			},
			39: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${p[1]}回合 | 燃烧 | ${Math.ceil(p[5]/10)}+${p[6]/10}%${show(p[8])}`;
			},
			40: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${p[1]}回合 | 冻结 | ${Math.ceil(p[5]/10)}+${p[6]/10}%${show(p[8])}`;
			},
			41: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${p[1]}回合 | 裂风 | ${Math.ceil(p[5]/10)}+${p[6]/10}%${show(p[8])}`;
			},
			42: 'STEAL',
			43: 'REWRITE',
			44: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | 抽卡+${p[1]}`;
			},
			45: 'NONE',
			46: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let db, db1 = show(p[3]) , db2 = show(p[4]);

				if(db2 && db1 != db2) db = `${db1}、${db2}`;
				else db = db1;

				return `${target} | 解除${db}状态`;
			},
			47: 'BUFF_RELEASE_ONE',
			48: 'CARD_SEAL',
			49: (card, skill, role, skillFirst) => {
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
			61: (card, skill, role, skillFirst) => {
				let target = showTarget(skill, role, skillFirst);

				if(role.params[1] != 9999) _l('New Params Skill 61');

				return `${target} | 显示自身的元素`;
			},
			62: 'ENEMY_AI_TRIGGER_FLAG_SET',
			63: 'ATTACK_BARRIER',
			64: (card, skill, role, skillFirst) => {
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
			75: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${p[1]}回合 | 附加伤害 | 所受伤害的${p[2]/10}%`;
			},
			76: 'BUFF_RELEASE_ONE_NUM',
			77: 'DEBUFF_RELEASE_ONE_NUM',
			78: 'PARAM_UP_BUFF_CONVERT',
			79: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | <kqud title="发动条件：处于${show(p[6])}状态">${show(p[6])}</kqud> |\x20
					回合+${p[1]} | 伤害提升${p[2]}%`;
			},
			80: 'HEAL_REVERSE',
			81: 'ATK_UP_BY_NOW_TURN_DAMAGE',
			82: 'DEF_UP_BY_NOW_TURN_DAMAGE',
			83: 'ATK_BREAK_BY_NOW_TURN_DAMAGE',
			84: 'GUARD_BREAK_BY_NOW_TURN_DAMAGE',
			85: 'ATK_OP_NOW_TURN_REVENGE',
			86: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${p[1]}回合 | 提升暴击率 | ${p[2]}%`;
			},
			87: 'DEAL_PENALTY',
			88: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${p[1]}回合 | 感电 | ${Math.ceil(p[5]/10)}+${p[6]/10}%${show(p[8])}`;
			},
			89: 'DARKNESS_RANDOM',
			90: 'DARKNESS_APPOINT',
			91: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${p[1]}回合 | 提升黑暗抗性 | ${p[2]}%`;
			},
			92: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let num = (p[2] == p[3] ? p[2]: `${p[2]}~${p[3]}`);

				if(~~p[5] || ~~p[6] || ~~p[7]) _l('miao?');

				return `${target} | ${p[1]}回合 | 陷阱 | ${num}张 |\x20
					<kqud title="时机：我方卡牌全部发动后，敌方行动前">使用后受到伤害${p[4]}点</kqud>`;
			},
			93: 'CARD_TRAP_DOT',
			94: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${p[1]}回合 | COST封印 | ${p[2]}点`;
			},
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
			107: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[2] + ~~p[5] * card.info.max.level);

				return `${target} | ${p[1]}回合 | 追加${show(p[6])}元素伤害 |\x20
					<kqud title="等级成长：${p[2]}+${p[5]}*等级">${base}</kqud>点`;
			},
			108: 'ENEMY_AWAKE_FLAG_SET',
			109: 'FORCE_BATTLE_END',
			110: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[4] + ~~p[5] / 1000 * card.info.max.level);

				return `${target} | ${p[1]}回合 | 提升${show(p[6])}元素耐性 |\x20
					<kqud title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</kqud>点`;
			},
			111: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[4] + ~~p[5] / 1000 * card.info.max.level);

				return `${target} | ${p[1]}回合 | 降低${show(p[6])}元素耐性 |\x20
					<kqud title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</kqud>点`;
			},
			112: 'ATTR_DEF_UP_SUPPORT',
			113: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				let base = Math.ceil(~~p[2] / 100 + ~~p[3] / 100 * card.info.max.level);

				return `${target} | ${p[1]}回合 | 反射伤害 |\x20
					所受伤害的<kqud title="等级成长：${p[2]/100}+${p[3]/100}*等级">${base}</kqud>%`;
			},
			114: 'ATK_OP_REFLECTION_INVALID',
			115: 'DEBUFF_REGIST_LIMIT',
			116: 'DEBUFF_REGIST_CARD_LIMIT',
			117: 'TRANCE_GAUGE_STATE_CHANGE',
			118: 'TRANCE_GAUGE_VALUE_UP',
			119: 'TRANCE_GAUGE_VALUE_DOWN',
			120: 'TRANCE_GAUGE_OVER_HEAT_TURN_ADD',
			121: 'ENDURE',
			122: 'CRITICAL_DOWN',
			123: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${show(p[6]) || '任意'}元素<kqud title="技能元素等价于卡面显示的元素">技能</kqud> | 提升${show(p[7])}伤害 | ${p[2] / 10}%`;
			},
			124: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${show(p[6]) || '任意'}元素<kqud title="技能元素等价于卡面显示的元素">技能</kqud> | 提升${show(p[7])}支援效果 | ${p[4] / 10}%`;
			},
			125: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${show(p[6]) || '任意'}元素<kqud title="技能元素等价于卡面显示的元素">技能</kqud> | 提升${show(p[7])}效果 | ${p[4] / 10}%`;
			},
			126: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${show(p[6]) || '任意'}元素<kqud title="技能元素等价于卡面显示的元素">技能</kqud> | 提升${show(p[7])}弱化效果 | ${p[4] / 10}%`;
			},
			127: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${show(p[6]) || '任意'}元素<kqud title="技能元素等价于卡面显示的元素">技能</kqud> | 提升${show(p[7])}弱化效果 | ${p[4] / 10}%`;
			},
			128: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${show(p[6]) || '任意'}元素<kqud title="技能元素等价于卡面显示的元素">技能</kqud> | 提升治疗效果 | ${p[4] / 10}%`;
			},
			129: (card, skill, role, skillFirst) => {
				let p = role.params, target = showTarget(skill, role, skillFirst);

				return `${target} | ${show(p[4]) || '任意'}元素<kqud title="技能元素等价于卡面显示的元素">技能</kqud> | 提升${show(p[5])}伤害暴击率 | ${p[2] / 10}%`;
			},
			130: 'DAMAGE_CUT2',
			131: 'DAMAGE_BOOST_ORDER_TARGET_DEBUFF',
			132: 'DAMAGE_CUT_ORDER_TARGET_DEBUFF'
		};
	};
};