module.exports = {
	rare: {
		1: 'N',
		2: 'HN',
		3: 'R',
		4: 'SR',
		5: 'UR',
		6: 'MR'
	},
	sex: {
		1: '男',
		2: '女',
		3: '双性',
		4: '未知'
	},
	hand: {
		1: '右手',
		2: '左手',
		3: '双手',
		4: '未知'
	},
	uses: {
		1: 'EXP',
		2: 'FAME',
		3: 'EVO',
		4: 'GOLD',
		5: 'CORE',
		6: 'SELL'
	},
	skillType: {
		1: 'ATTACK',
		2: 'HEAL',
		3: 'REGENERATE',
		4: 'PARAM_UP',
		5: 'PARAM_DOWN',
		6: 'DEF_UP',
		7: 'POISON',
		8: 'PER_UP',
		9: 'PER_DOWN',
		10: 'PER_SUCCESS'
	},
	skillKind: {
		1: '物',
		2: '魔',
		3: '治',
		4: '支',
		5: '防',
		6: '弱',
		7: '特'
	},
	attr: {
		1: '火',
		2: '冰',
		3: '风',
		4: '光',
		5: '暗',
		6: '土',
		7: '雷',
		8: '水',
		9: '虚',
		102: '火冰',
		103: '火风',
		104: '火光',
		105: '火暗',
		203: '冰风',
		204: '冰光',
		205: '冰暗',
		304: '风暗',
		305: '风光',
		405: '光暗'
	},
	job: {
		1: '佣兵',
		2: '富豪',
		3: '盗贼',
		4: '歌姬',
		5: '通用'
	},
	porm: {
		1: '物理',
		2: '魔法',
		3: '物理魔法任意'
	},
	skillTarget: {
		1: '自身',
		2: '我方单体',
		3: '我方全体',
		4: '敌方单体',
		5: '敌方全体',
		6: '死亡敌方单体',
		7: '死亡敌方全体',
		8: '敌我全体',
		9: 'SELF_INVOLVE_DEAD',
		10: 'USER_ONE_INVOLVE_DEAD',
		11: 'USER_ALL_INVOLVE_DEAD',
		12: 'ENEMY_ONE_INVOLVE_DEAD',
		13: 'ENEMY_ALL_INVOLVE_DEAD'
	},
	skillRank: {
		200: 'RANK1',
		300: 'RANK2',
		400: 'RANK3',
		450: 'RANK4',
		500: 'RANK5'
	},
	skillCond: {
		1: 'DECK_COMBO_COUNT',
		2: 'TARGET_ATTR',
		3: 'TARGET_DEBUFF',
		4: 'RANDOM',
		5: 'SELF_OTHER_PLAY_ATTR',
		6: 'SELF_OTHER_PLAY_SKILL_KIND',
		7: 'SELF_OTHER_PLAY_RARITY',
		8: 'SELF_HP_PER',
		9: 'SELF_HP_FIXED',
		10: 'TURN',
		11: 'SELF_PLAYED_SKILL_KIND',
		12: 'FRIEND_PLAYED_SKILL_KIND',
		13: 'SELF_OTHER_PLAY_NUM',
		14: 'FRIEND_PLAY_NUM',
		15: 'TARGET_JOB_TYPE',
		16: 'SELF_PLAY_MOST_LOW_COST',
		17: 'FRIEND_PLAY_MOST_LOW_COST',
		18: 'SELF_PLAY_MOST_HIGH_COST',
		19: 'FRIEND_PLAY_MOST_HIGH_COST',
		20: 'SELF_PLAY_COST_TOTAL',
		21: 'FRIEND_PLAY_COST_TOTAL',
		22: 'SELF_DEBUFF',
		23: 'USER_SIDE_DEBUFF',
		24: 'ENEMY_SIDE_DEBUFF',
		25: 'USER_SIDE_BUFF',
		26: 'ENEMY_SIDE_BUFF',
		27: 'SELF_ENEMY_AI_FLAG',
		28: 'SELF_OTHER_PLAY_TAG',
		29: 'FRIEND_PLAY_TAG',
		30: 'SELF_PLAYED_TAG',
		31: 'FRIEND_PLAYED_TAG',
		32: 'SELF_MAIN_DECK_TAG',
		33: 'SELF_SUPPORT_DECK_TAG',
		34: 'SELF_ALL_DECK_TAG',
		35: 'SELF_MAIN_DECK_ATTR',
		36: 'SELF_MAIN_DECK_SKILL_KIND',
		37: 'SELF_BUFF',
		38: 'TARGET_BUFF',
		39: 'SELF_ENCHANT_DAMAGE'
	},
	skillRole: {
		1: 'ATTACK_AA',
		2: 'ATTACK_AP',
		3: 'ATTACK_PA',
		4: 'ATTACK_PP',
		5: 'ATK_OP_DRAIN',
		6: 'ATK_OP_REVENGE',
		7: 'ATK_OP_PIERCING',
		8: 'ATK_OP_DAMAGE_INCREASE',
		9: 'HEAL_FIXED',
		10: 'HEAL_BY_TARGET_HP',
		11: 'HEAL_BY_TARGET_MAXHP',
		12: 'HEAL_BY_SELF_PARAM',
		13: 'REGENERATE_FIXED',
		14: 'REGENERATE_BY_TARGET_HP',
		15: 'REGENERATE_BY_TARGET_MAXHP',
		16: 'REGENERATE_BY_SELF_PARAM',
		17: 'ATK_UP_BY_SELF_PARAM',
		18: 'ATK_UP_BY_TARGET_PARAM',
		19: 'ATK_UP_FIXED',
		20: 'DAMAGE_UP',
		21: 'DEBUFF_RELEASE',
		22: 'DAMAGE_CUT',
		23: 'DEF_UP_BY_SELF_PARAM',
		24: 'DEF_UP_BY_TARGET_PARAM',
		25: 'DEF_UP_FIXED',
		26: 'HP_CUT',
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
		44: 'DEAL_BONUS',
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
	},
	roleTarget: {
		1: 'SELECT',
		2: 'SELF',
		3: 'FRIEND_ALL',
		4: 'ENEMY_ALL',
		5: 'TEAMBATTLE_FRIEND_ONE',
		6: 'TEAMBATTLE_FRIEND_ALL',
		7: 'TEAMBATTLE_ENEMY_ONE',
		8: 'TEAMBATTLE_ENEMY_ALL',
		9: 'PVP_FRIEND_ONE',
		10: 'PVP_FRIEND_ALL',
		11: 'PVP_ENEMY_ONE',
		12: 'PVP_ENEMY_ALL',
		13: 'SELF_INVOLVE_DEAD',
		14: 'FRIEND_ALL_INVOLVE_DEAD',
		15: 'ENEMY_ALL_INVOLVE_DEAD'
	},
	roleParam: {
		1: 'VALUE',
		skillKind: 'SKILL_KIND_BIT',
		attr: 'ATTR_BIT',
		battleParam: 'SKILL_ROLE_BATTLE_PARAM',
		porm: 'SKILL_PHYSICS_TYPE',
		roleDebuff: 'SKILL_ROLE_KIND_DEBUFF',
		roleBuff: 'SKILL_ROLE_KIND_BUFF',
		roleDot: 'DOT'
	},
	battleParam: {
		1: '血量',
		2: '最大血量',
		3: '物理攻击力',
		4: '魔法攻击力',
		5: '恢复量',
		6: '物理防御',
		7: '魔法防御'
	},
	roleDebuff: {
		1: 'ATK_BREAK_BY_ATK',
		2: 'ATK_BREAK_BY_INT',
		3: 'ATK_BREAK_BY_MND',
		4: 'GUARD_BREAK_BY_DEF',
		5: 'GUARD_BREAK_BY_MDEF',
		6: 'UNDERMINE',
		7: 'POISON',
		8: 'BURN',
		9: 'FREEZE',
		10: 'BLEED',
		11: 'CHARM',
		12: 'STAN',
		13: 'SILENCE',
		14: 'DAMAGE_DOWN',
		15: 'CARD_SEAL',
		16: 'ATTR_SEE',
		17: 'FIELD_ATTR_DOWN',
		18: 'FIELD_HEAL_DOWN',
		19: 'WEAKNESS',
		20: 'HEAL_REVERSE',
		21: 'DEAL_PENALTY',
		22: 'ELECTRIC',
		23: 'DARKNESS',
		24: 'CARD_TRAP_DAMAGE',
		25: 'CARD_TRAP_DOT',
		26: 'COST_BLOCK',
		27: 'ATTR_DEF_DOWN',
		28: 'CRITICAL_DOWN'
	},
	roleBuff: {
		1: 'ATK_UP_BY_ATK',
		2: 'ATK_UP_BY_INT',
		3: 'ATK_UP_BY_MND',
		4: 'DEF_UP_BY_DEF',
		5: 'DEF_UP_BY_MDEF',
		6: 'DAMAGE_UP',
		7: 'DAMAGE_CUT',
		8: 'HEAL',
		9: 'STEAL',
		10: 'ATTR',
		11: 'CARD_SEAL_REGIST',
		12: 'DEAL_BONUS',
		13: 'ATTR_RATE_DOWN_INVALID',
		14: 'ATTR_HIDE',
		15: 'ATTACK_BARRIER',
		16: 'COVERING',
		17: 'FIELD_ATTR_UP',
		18: 'FIELD_SKILL_UP',
		19: 'FIELD_HEAL_UP',
		20: 'FIELD_JAMMING_UP',
		21: 'FIELD_SUPPORT_DEFENCE_UP',
		22: 'PARAM_UP_BUFF_CONVERT',
		23: 'CRITICAL_UP',
		24: 'DARKNESS_REGIST',
		25: 'CRITICAL_UP_BY_SUPPORT',
		26: 'ROLE_VALUE_UP_BY_ROLE_OP',
		27: 'DECK_COMBO_RATE_UP',
		28: 'DEBUFF_REGIST',
		29: 'NEED_COST_DOWN',
		30: 'ROLE_VALUE_UP_BY_PVP_RATE',
		31: 'ENCHANT',
		32: 'ATK_UP_BY_MAX_HP',
		33: 'ATTR_DEF_UP',
		34: 'REFLECTION',
		35: 'DEBUFF_REGIST_LIMIT',
		36: 'ENDURE',
		37: 'DAMAGE_BOOST',
		38: 'ATK_UP_BOOST',
		39: 'DEF_UP_BOOST',
		40: 'ATK_BREAK_BOOST',
		41: 'GUARD_BREAK_BOOST',
		42: 'HEAL_BOOST',
		43: 'CRITICAL_BOOST',
		44: 'DAMAGE_CUT2',
		45: 'DAMAGE_BOOST_ORDER_TARGET_DEBUFF',
		46: 'DAMAGE_CUT_ORDER_TARGET_DEBUFF'
	},
	roleDot: {
		1: 'POISON',
		2: 'BURN',
		3: 'FREEZE',
		4: 'BLEED',
		5: 'ELECTRIC',
		6: 'TRAP'
	},
	skillTiming: {
		1: 'NORMAL',
		2: 'ENEMY_ACTION_END'
	}

};