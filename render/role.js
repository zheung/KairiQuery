let shower = dicter.shower;

let show = (p) => { return dicter.shower[p[0]][p[1]]; };

let showTarget = (skill, role) => {
	if(role.info.target == 1)
		return shower.skillTarget[skill.info.target];
	else
		return shower.roleTarget[role.info.target];
};

module.exports = {
	1: (card, skill, role) => {
		let p = role.params, target = showTarget(skill, role);

		let base = Math.ceil(~~p[1]+~~p[2]/1000*card.info.max.level);

		return `${target} | ${p[5]}回${show(p[8])}属性的
			<kqud title="${p[7]}%暴击率${skill.info.chain}%Chain威力">${show(p[9])}攻击</kqud>
			 | <kqud title="基础伤害：${p[1]}+${p[2]/1000}*等级">${base}</kqud> + ${p[3]/10}%${show(p[6])}`;
	},
	2: false,
	3: false,
	4: false,
	5: (card, skill, role) => {
		let p = role.params, target = showTarget(skill, role);

		return `${target} | 回复HP | 造成伤害的${p[1]}%`;
	},
	6: (card, skill, role) => {
		let p = role.params;

		return `附加伤害 | <kqud title="最大值：${show(p[3])}的${p[4]}%">每回合累计损失HP的${p[1]}%</kqud>`;
	},
	7: (card, skill, role) => {
		let p = role.params;

		return `附加伤害 | <kqud title="等价于 无视目标对应防御的${p[1]}%">目标对应防御的${p[1]}%</kqud>`;
	},
	8: (card, skill, role) => {
		let p = role.params;

		return `附加伤害 | 当前${show(p[5])}的${p[3]/10}%`;
	},
	9: (card, skill, role) => {
		let p = role.params, target = showTarget(skill, role);

		let base = Math.ceil(~~p[1]+~~p[2]/1000*card.info.max.level);

		return `${target} | 回复HP | <kqud title="基础回复：${p[1]}+${p[2]/1000}*等级">${base}</kqud>+
			${p[3]/10}%${show(p[5])}`;
	},
	10: false,
	11: false,
	12: (card, skill, role) => {
		let p = role.params, target = showTarget(skill, role);

		return `${target} | 回复HP | ${show(p[1])}的${p[2]/10}%`;
	},
	13: (card, skill, role) => {
		let p = role.params, target = showTarget(skill, role);

		let base = Math.ceil(~~p[2]+~~p[3]/1000*card.info.max.level);

		return `${target} | ${p[1]}回合
			 | <kqud title="发动时机：回合开始前">持续回复HP</kqud>
			 | <kqud title="基础回复：${p[2]}+${p[3]/1000}*等级">${base}</kqud>+
			${p[4]/10}%${show(p[6])}`;
	},
	14: false,
	15: false,
	16: false,
	17: (card, skill, role) => {
		let p = role.params, target = showTarget(skill, role);

		return `${target} | ${p[1]}回合 | ${show(p[2])}提升
			 | ${p[6]}+${p[4]/10}%${show(p[3])}点`;
	},
	18: false,
	19: (card, skill, role) => {
		let p = role.params, target = showTarget(skill, role);

		let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

		return `${target} | ${p[1]}回合 | ${show(p[2])}提升
			 | <kqud title="基础提升：${p[4]/1000}+${p[5]/1000}*等级">${base}</kqud>点`;
	},
	20: false,
	21:	false,
	22: false,
	23: (card, skill, role) => {
		let p = role.params, target = showTarget(skill, role);

		return `${target} | ${p[1]}回合 | ${show(p[2])}提升
			 | ${p[6]}+${p[4]/10}%${show(p[3])}`;
	},
	24: 'DEF_UP_BY_TARGET_PARAM',
	25: (card, skill, role) => {
		let p = role.params, target = showTarget(skill, role);

		let base = Math.ceil(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

		return `${target} | ${p[1]}回合 | ${show(p[2])}提升
			 | <kqud title="基础提升：${p[4]/1000}+${p[5]/1000}*等级">${base}</kqud>点`;
	},
	// 26: (card, skill, role) => {
	// 	let p = role.params, target = showTarget(skill, role);

	// 	return '';
	// },
	// 26: 'HP_CUT',
	27: 'BUFF_RELEASE',
	28: 'ATK_BREAK_BY_SELF_PARAM',
	29: 'ATK_BREAK_FIXED',
	30: 'GUARD_BREAK_BY_SELF_PARAM',
	31: 'GUARD_BREAK_BY_TARGET_PARAM',
	32: 'GUARD_BREAK_FIXED',
	33: 'DAMAGE_DOWN',
	34: 'UNDERMINE',
	35: 'STAN',
	36: 'SILENCE',
	37: 'CHARM',
	38: 'POISON',
	39: 'BURN',
	40: 'FREEZE',
	41: 'BLEED',
	42: 'STEAL',
	43: 'REWRITE',
	44: (card, skill, role) => {
		let p = role.params, target = showTarget(skill, role);

		return `${target} | 抽卡+${p[1]}`;
	},
	45: 'NONE',
	46: 'DEBUFF_RELEASE_ONE',
	47: 'BUFF_RELEASE_ONE',
	48: 'CARD_SEAL',
	49: 'CARD_SEAL_REGIST',
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
	60: 'ATK_OP_ATTR_RATE_DOWN_INVALID',
	61: 'ATTR_SEE',
	62: 'ENEMY_AI_TRIGGER_FLAG_SET',
	63: 'ATTACK_BARRIER',
	64: 'COVERING',
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
	75: 'WEAKNESS',
	76: 'BUFF_RELEASE_ONE_NUM',
	77: 'DEBUFF_RELEASE_ONE_NUM',
	78: 'PARAM_UP_BUFF_CONVERT',
	79: 'DOT_VALUE_UP',
	80: 'HEAL_REVERSE',
	81: 'ATK_UP_BY_NOW_TURN_DAMAGE',
	82: 'DEF_UP_BY_NOW_TURN_DAMAGE',
	83: 'ATK_BREAK_BY_NOW_TURN_DAMAGE',
	84: 'GUARD_BREAK_BY_NOW_TURN_DAMAGE',
	85: 'ATK_OP_NOW_TURN_REVENGE',
	86: 'CRITICAL_UP',
	87: 'DEAL_PENALTY',
	88: 'ELECTRIC',
	89: 'DARKNESS_RANDOM',
	90: 'DARKNESS_APPOINT',
	91: 'DARKNESS_REGIST',
	92: 'CARD_TRAP_DAMAGE',
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
	107: 'ENCHANT',
	108: 'ENEMY_AWAKE_FLAG_SET',
	109: 'FORCE_BATTLE_END',
	110: 'ATTR_DEF_UP',
	111: 'ATTR_DEF_DOWN',
	112: 'ATTR_DEF_UP_SUPPORT',
	113: 'REFLECTION',
	114: 'ATK_OP_REFLECTION_INVALID'
};