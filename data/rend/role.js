module.exports = async(serv) => {
	let show = (p) => { return shower[p[0]][p[1]]; };

	let showTarget = (skill, role, sf) => {
		if(role.target == 1)
			return shower.skillTarget[skill.info.target || sf.info.target];
		else
			return shower.roleTarget[role.target];
	};

	return {
		ATTACK_AA: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[1]+~~p[2]/1000*card.info.max.level);

			return `${target} | ${p[5]}段${show(p[8])}元素的${show(p[9])}攻击 |\x20
				${base ? `<samp title="等级成长：${p[1]}+${p[2]/1000}*等级">${base}</samp>+` : ''}
				${show(p[6])}的${p[3]/10}%
				${(p[7] / (serv=='ps'?1:10) != 15 ? ` | ${~~p[7] / 10}%高暴击` : '')}`;
		},
		ATTACK_AP: false,
		ATTACK_PA: false,
		ATTACK_PP: false,
		ATK_OP_DRAIN: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 恢复生命 | 造成伤害的${p[1]}%`;
		},
		ATK_OP_DRAIN_ALL: async(card, skill, role) => {
			let p = role.params;

			return `我方全体 | 恢复生命 | 造成伤害的${p[1]}%`;
		},
		ATK_OP_REVENGE: async(card, skill, role) => {
			let p = role.params;

			return `附加伤害 | 每段攻击 | 累计损失生命的${p[1]}% | 上限：${show(p[3])}的${p[4]}%`;
		},
		ATK_OP_NOW_TURN_REVENGE: false,
		ATK_OP_PIERCING: async(card, skill, role) => {
			let p = role.params;

			return `附加伤害 | 每段攻击 | <samp title="等价于 无视目标对应防御的${p[1]}%">目标对应防御的${p[1]}%</samp>`;
		},
		ATK_OP_DAMAGE_INCREASE: async(card, skill, role) => {
			let p = role.params;

			return `附加伤害 | 每段攻击 | ${show(p[5])}的${p[3]/10}%`;
		},
		ATK_OP_ATTR_RATE_DOWN_INVALID: () => { return '免疫元素克制'; },
		HEAL_FIXED: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[1]+~~p[2]/1000*card.info.max.level);

			return `${target} | 恢复生命 | ${base ? `<samp title="等级成长：${p[1]}+${p[2]/1000}*等级">${base}</samp>+` : ''}
				${show(p[5])}的${p[3]/10}%`;
		},
		HEAL_BY_TARGET_HP: false,
		HEAL_BY_TARGET_MAXHP: false,
		HEAL_BY_SELF_PARAM: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 恢复生命 | ${show(p[1])}的${p[2]/10}%`;
		},
		REGENERATE_FIXED: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[2]+~~p[3]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 |\x20
				<samp title="发动时机：回合开始前">持续恢复生命</samp>&nbsp;|\x20
				<samp title="等级成长：${p[2]}+${p[3]/1000}*等级">${base}</samp>+
				${p[4]/10}%${show(p[6])}`;
		},
		REGENERATE_BY_TARGET_HP: false,
		REGENERATE_BY_TARGET_MAXHP: false,
		REGENERATE_BY_SELF_PARAM: false,
		CARD_SEAL_RECOVERY: false,
		ATK_UP_BY_SELF_PARAM: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
				<samp title="等级成长：${p[6]}*等级">${p[6]*card.info.max.level}</samp>+${show(p[3])}的${p[4]/10}%`;
		},
		ATK_UP_BY_TARGET_PARAM: false,
		ATK_UP_FIXED: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
				<samp title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		ATK_UP_FIXED_ATTR_BONUS: false,
		ATK_UP_BY_NOW_TURN_DAMAGE: false,
		DAMAGE_UP: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升${show(p[4])}${show(p[5])}伤害 | ${p[2]/10}%`;
		},
		DEBUFF_RELEASE: false,
		DEBUFF_RELEASE_ONE: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let db, db1 = show(p[3]) , db2 = show(p[4]);

			if(db2 && db1 != db2) db = `${db1}、${db2}`;
			else db = db1;

			return `${target} | 解除${db}状态`;
		},
		DEBUFF_RELEASE_ONE_NUM: false,
		DEBUFF_RELEASE_RANDOM: false,
		DEBUFF_RELEASE_OLD: false,
		ATTR_RATE_DOWN_INVALID: false,
		PARAM_UP_BUFF_CONVERT: false,
		CRITICAL_UP: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升暴击率 | ${p[2] / 10}%`;
		},
		ENCHANT: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[2] + ~~p[5] * card.info.max.level);

			return `${target} | ${p[1]}回合 | 追加${show(p[6])}元素伤害 |\x20
				<samp title="等级成长：${p[2]}+${p[5]}*等级">${base}</samp>点`;
		},
		DAMAGE_CUT: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 减免所受伤害的${p[2]/10}%`;
		},
		DEF_UP_BY_SELF_PARAM: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[5]/1000+~~p[6]*card.info.max.level);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
				<samp title="等级成长：${p[5]/1000}+${p[6]}*等级">${base}</samp>+${p[4]/10}%${show(p[3])}`;
		},
		DEF_UP_BY_TARGET_PARAM: false,
		DEF_UP_FIXED: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 提升${show(p[2])} |\x20
				<samp title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		DEF_UP_FIXED_ATTR_BONUS: false,
		DEF_UP_BY_NOW_TURN_DAMAGE: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 受到伤害的${p[4]}% | 转换为${show(p[2])} | 上限：${p[5]}`;
		},
		CARD_SEAL_REGIST: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升封印抗性 | ${p[2]}%`;
		},
		ATTACK_BARRIER: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | ${p[4]}层 | ${show(p[5])}护盾 | 伤害${p[2]}点以下无效化`;
		},
		ATTACK_BARRIER_APPOINT_ATTR: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | ${p[4]}层 | ${show(p[6])}元素${show(p[5])}护盾 | 伤害${p[2]}点以下无效化`;
		},
		COVERING: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			if(p[4][1] || p[5][1] != 3) L('New Params Role 64');

			return `${target} | ${p[1]}回合 | 使敌方攻击指向自身 | 减免所受伤害的${p[2]/10}%`;
		},
		DARKNESS_REGIST: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升黑暗抗性 | ${p[2]}%`;
		},
		DEBUFF_REGIST: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 提升${show(p[3])}抗性 | ${p[2]}%`;
		},
		DEBUFF_REGIST_CARD: false,
		HP_CUT: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 生命降低 | 当前生命的${p[1]}%`;
		},
		BUFF_RELEASE: async(card, skill, role, skillFirst) => {
			let target = showTarget(skill, role, skillFirst);

			if(~~role.params[1] < 100 || ~~role.params[2] > 0) L('New Role Param', role.type, 'Card', card.id, 'Skill', skill.id, 'Role', role.id);

			return `${target} | 解除所有BUFF`;
		},
		BUFF_RELEASE_ONE: false,
		BUFF_RELEASE_ONE_NUM: false,
		BUFF_RELEASE_RANDOM: false,
		BUFF_RELEASE_OLD: false,
		ATK_BREAK_BY_SELF_PARAM: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 降低${show(p[2])} |\x20
				<samp title="等级成长：${p[6]}*等级">${p[6]*card.info.max.level}</samp>+${show(p[3])}的${p[4]/10}%`;
		},
		ATK_BREAK_FIXED: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 降低${show(p[2])} |\x20
				<samp title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		ATK_BREAK_BY_NOW_TURN_DAMAGE: false,
		GUARD_BREAK_BY_SELF_PARAM: false,
		GUARD_BREAK_BY_TARGET_PARAM: false,
		GUARD_BREAK_FIXED: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 降低${show(p[2])} |\x20
				<samp title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		GUARD_BREAK_BY_NOW_TURN_DAMAGE: false,
		DAMAGE_DOWN: false,
		UNDERMINE: false,
		STAN: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 打断行动 | 机率${p[2]}%`;
		},
		POISON: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = ~~p[4]+Math.floor(~~p[5]*card.info.max.level/1000);

			return `${target} | ${p[1]}回合 | 毒 | <samp title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</samp>+${p[6]/10}%${show(p[8])}`;
		},
		BURN: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = ~~p[4]+Math.floor(~~p[5]*card.info.max.level/1000);

			return `${target} | ${p[1]}回合 | 燃烧 | <samp title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</samp>+${p[6]/10}%${show(p[8])}`;
		},
		FREEZE: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = ~~p[4]+Math.floor(~~p[5]*card.info.max.level/1000);

			return `${target} | ${p[1]}回合 | 冻结 | <samp title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</samp>+${p[6]/10}%${show(p[8])}`;
		},
		BLEED: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = ~~p[4]+Math.floor(~~p[5]*card.info.max.level/1000);

			return `${target} | ${p[1]}回合 | 裂风 | <samp title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</samp>+${p[6]/10}%${show(p[8])}`;
		},
		STEAL: false,
		ELECTRIC: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = ~~p[4]+Math.floor(~~p[5]*card.info.max.level/1000);

			return `${target} | ${p[1]}回合 | 感电 | <samp title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</samp>+${p[6]/10}%${show(p[8])}`;
		},
		CARD_SEAL: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst),
				turn = (~~p.param1 == ~~p.param2) ? `${~~p.param1}回合` : `${~~p.param1}~${~~p.param2}回合`,
				num = (~~p.param3 == ~~p.param4) ? `${~~p.param3}张` : `${~~p.param3}~${~~p.param4}张`,
				cost = (~~p.param7 == ~~p.param8) ? `${~~p.param7}张` : `${~~p.param7}~${~~p.param8}张`;

			return `${target} | 封印 | ${show(p[5])}类型${show(p[5])}元素 | ${cost} | ${turn}${num}`;
		},
		WEAKNESS: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 标记 | 受到攻击时 | 伤害提升${p[2]/10}%`;
		},
		HEAL_REVERSE: false,
		COST_BLOCK: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | COST封印 | ${p[2]}点`;
		},
		CARD_TRAP_DAMAGE: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let num = (p[2] == p[3] ? p[2]: `${p[2]}~${p[3]}`);

			if(~~p[5] || ~~p[6] || ~~p[7]) L('miao?');

			return `${target} | ${p[1]}回合 | 陷阱 | ${num}张 |\x20
				<samp title="时机：我方卡牌全部发动后，敌方行动前">使用后受到伤害${p[4]}点</samp>`;
		},
		CARD_TRAP_DOT: false,
		DARKNESS_RANDOM: false,
		DARKNESS_APPOINT: false,
		REWRITE: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | 属性变更 | ${show(p[2])}`;
		},
		DEAL_BONUS: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 抽卡+${p[1]}`;
		},
		NONE: false,
		OUTPUT_TEXT: false,
		DESTRUCT: false,
		ATTR_HIDE: false,
		ATTR_SEE: async(card, skill, role, skillFirst) => {
			let target = showTarget(skill, role, skillFirst);

			if(role.params[1] != 9999) L('New Params Role 61');

			return `${target} | 显示自身的元素`;
		},
		REVIVE: false,
		ROLE_OP_COMBO: false,
		DOT_VALUE_UP: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | <samp title="发动条件：处于${show(p[6])}状态">${show(p[6])}</samp>&nbsp;|\x20
				回合+${p[1]} | 伤害提升${p[2]}%`;
		},
		DEAL_PENALTY: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 抽卡-${p[1]}`;
		},
		DEAL_PENALTY_TURN_APPOINT: false,
		ENEMY_AWAKE_FLAG_SET: false,
		FORCE_BATTLE_END: false,
		FIELD_ATTR_UP: false,
		FIELD_ATTR_DOWN: false,
		FIELD_SKILL_UP: false,
		FIELD_HEAL_UP: false,
		FIELD_HEAL_DOWN: false,
		FIELD_JAMMING_UP: false,
		FIELD_SUPPORT_DEFENCE_UP: false,
		CRITICAL_UP_BY_SUPPORT: false,
		ROLE_VALUE_UP_BY_ROLE_OP: false,
		DECK_COMBO_RATE_UP: false,
		NEED_COST_DOWN: false,
		ROLE_VALUE_UP_BY_PVP_RATE: false,
		ATK_UP_FIXED_PARAM_UNIQUE: false,
		DEF_UP_FIXED_PARAM_UNIQUE: false,
		ATK_UP_FIXED_SUPPORT: false,
		DEF_UP_FIXED_SUPPORT: false,
		ATTR_DEF_DOWN: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[4] + ~~p[5] / 1000 * card.info.max.level);

			return `${target} | ${p[1]}回合 | 降低${show(p[6])}元素耐性 |\x20
				<samp title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		ATTR_DEF_UP: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[4] + ~~p[5] / 1000 * card.info.max.level);

			return `${target} | ${p[1]}回合 | 提升${show(p[6])}元素耐性 |\x20
				<samp title="等级成长：${p[4]}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		ATTR_DEF_UP_SUPPORT: false,
		DEBUFF_REGIST_LIMIT: false,
		DEBUFF_REGIST_CARD_LIMIT: false,
		REFLECTION: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[2] / 100 + ~~p[3] / 100 * card.info.max.level);

			return `${target} | ${p[1]}回合 | 反射伤害 |\x20
				所受伤害的<samp title="等级成长：${p[2]/100}+${p[3]/100}*等级">${base}</samp>%`;
		},
		ATK_OP_REFLECTION_INVALID: false,
		TRANCE_GAUGE_STATE_CHANGE: false,
		TRANCE_GAUGE_VALUE_UP: false,
		TRANCE_GAUGE_VALUE_DOWN: false,
		TRANCE_GAUGE_OVER_HEAT_TURN_ADD: false,
		ENDURE: false,
		CRITICAL_DOWN: false,
		DAMAGE_BOOST: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp>&nbsp;| 提升${show(p[7])}伤害 | ${p[2] / 10}%`;
		},
		ATK_UP_BOOST: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp>&nbsp;| 提升${show(p[7])}支援效果 | ${p[4] / 10}%`;
		},
		DEF_UP_BOOST: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp>&nbsp;| 提升${show(p[7])}效果 | ${p[4] / 10}%`;
		},
		ATK_BREAK_BOOST: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp>&nbsp;| 提升${show(p[7])}弱化效果 | ${p[4] / 10}%`;
		},
		GUARD_BREAK_BOOST: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp>&nbsp;| 提升${show(p[7])}弱化效果 | ${p[4] / 10}%`;
		},
		HEAL_BOOST: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[6]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp>&nbsp;| 提升治疗效果 | ${p[4] / 10}%`;
		},
		CRITICAL_BOOST: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${show(p[4]) || '任意'}元素<samp title="技能元素等价于卡面显示的元素">技能</samp>&nbsp;| 提升${show(p[5])}伤害暴击率 | ${p[2] / 10}%`;
		},
		DAMAGE_CUT2: false,
		DAMAGE_BOOST_ORDER_TARGET_DEBUFF: false,
		DAMAGE_CUT_ORDER_TARGET_DEBUFF: false,
		ENEMY_CURSE: false,
		BLESS: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 祝福 | ${p[1]}回合`;
		},
		CURSE_RELEASE: false,
		BLESS_RELEASE: false,
		CURSE_TURN_DOWN: false,
		BLESS_TURN_DOWN: false,
		BEGINNING_DRAW: false,
		CURSE_TURN_UP: false,
		BLESS_TURN_UP: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			if(p[2][1]) L('New Params Role 143');

			return `${target} | 所有祝福 | 回合+${p[1]}`;
		},
		PARAM_LIMIT_BREAK_FIXED: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			let base = Math.floor(~~p[4]/1000+~~p[5]/1000*card.info.max.level);

			return `${target} | ${p[1]}回合 | 提高${show(p[2])}上限 |\x20
				<samp title="等级成长：${p[4]/1000}+${p[5]/1000}*等级">${base}</samp>点`;
		},
		GUTS: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | ${p[1]}回合 | ${target}死亡时 | 恢复${p[3]}%HP | 最多${p[2]}次`;
		},
		BURST_GAUGE_QUICK_UP: async(card, skill, role, skillFirst) => {
			let p = role.params, target = showTarget(skill, role, skillFirst);

			return `${target} | 提升变身进度 | ${p[1]}%`;
		}
	};
};