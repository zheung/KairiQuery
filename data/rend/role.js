// 渲染Role行动

module.exports = function(serv) {
	// 渲染游戏内置值
		let show = function(p) {
			return shower[p[0]][p[1]];
		};
	// 渲染行动目标 目标又行动目标和技能目标两种
		let showTarget = function(skill, role, sf) {
			if(role.target == 1)
				return shower.skillTarget[skill.info.target || sf.info.target];
			else
				return shower.roleTarget[role.target];
		};
	// 渲染手牌选择 一般是传承技能用
		let showHand = function(hand) {
		// 元素技能渲染
			let attrShow = show([ 'attr', hand.attr ]);
			let kindShow = show([ 'skillKind2', hand.kind ]);

			attrShow = attrShow != '全部' ? `[${attrShow}]` : '';
			kindShow = kindShow != '全部' ? `[${kindShow}]` : '';
		// COST渲染
			let costShow = '';

			let min = ~~hand.cost.min, max = ~~hand.cost.max;

			if(min <= 1) {
				min = 0;
			}
			if(max >= 9) {
				max = 0;
			}

			if(min == max && min != 0)
				costShow = `[Cost：${min}]`;
			else if(min && !max)
				costShow = `[Cost：${min}或以上]`;
			else if(!min && max)
				costShow = `[Cost：${max}或以下]`;
			else if(min != 0 && max != 0)
				costShow = `[Cost：${min}~${max}]`;
		// 分组渲染
			let groupShow = '';

			if(hand.group[0]) groupShow += ` 或 [${show(['tag', hand.group[0]])}]`;
			if(hand.group[1]) groupShow += ` 或 [${show(['tag', hand.group[1]])}]`;
			if(hand.group[2]) groupShow += ` 或 [${show(['tag', hand.group[2]])}]`;

			if(groupShow) {
				groupShow = groupShow.replace(/^ 或/, '');
				groupShow = `${groupShow}`;
			}

			return `${hand.num}张 | ${costShow}${attrShow}${kindShow}${groupShow}卡`;
		};
	// // 参数监视
	// 	let monit = function(params, options = [], showText, type) {
	// 		let flag = false;

	// 		for(let opt of options) {
	// 			if(opt instanceof Array) {
	// 				if(params['p'+opt[0]] != opt[1]){
	// 					L(`warn: ${type} params${opt[0]}`, params['p'+opt[0]]);
	// 					flag = true;
	// 				}
	// 			}
	// 			else {
	// 				if(params['p'+opt] && params['p'+opt] != '0') {
	// 					L(`warn: ${type} params${opt}`, params['p'+opt]);
	// 					flag = true;
	// 				}
	// 			}
	// 		}

	// 		if(flag && showText) { L(showText); }

	// 		return false;
	// 	};

		return {
		// 攻击
			ATTACK_AA: function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p4,p5,p6,p7,p8 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = Math.floor(~~p0+~~p1/1000*card.max.level);

				let type = p8 ? `${show(p8)}` : '';

				let time = p4>0 ? ` | ${p4}段` : '';
				let attr = p7 ? ` | ${show(p7)}` : '';

				let addi = ` | ${base}+${show(p5)}的${p2/10}%`;

				let crit = p6 / 10 != 15 ? ` | ${~~p6 / 10}%暴击` : '';

				let content = `${target}${time}${attr}${addi}${crit}`;
				let title = `基础值随等级成长：${p0}+${p1/1000}*等级`;

				return { name: type+'攻击', content: content, title: title };
			},
		// 吸血
			ATK_OP_DRAIN: function(card, skill, role) {
				let { p0 } = role.params;

				let content = `造成伤害的${p0}% | 转化为恢复[自身]生命`;
				let title = `造成伤害的${p0} 转化为 [自身]生命`;

				return { name: '吸血', content: content, title: title };
			},
			// 全体吸血
			ATK_OP_DRAIN_ALL: function(card, skill, role) {
				let { p0 } = role.params;

				let content = `造成伤害的${p0}% | 转化为[我方全体]生命`;
				let title = `造成伤害的${p0} 转化为 [我方全体]生命`;

				return { name: '吸血', content: content, title: title };
			},
		// 复仇
			ATK_OP_REVENGE: function(card, skill, role) {
				let { p0,p2,p3 } = role.params;

				let content = `每段攻击 | 叠加面板 | 累计损失生命的${p0}% | 上限：${show(p2)}的${p3}%`;
				let title = `累计损失生命的${p0} 转化为 攻击面板`;

				return { name: '复仇', content: content, title: title };
			},
		// 防御穿透
			ATK_OP_PIERCING: function(card, skill, role) {
				let { p0 } = role.params;

				let content = `每段攻击 | 无视防御 | 目标的攻击对应的防御的${p0}%`;
				let title = '直接修正防御值，不作用于面板';

				return { name: '穿透', content: content, title: title };
			},
		// 叠加参数
			ATK_OP_DAMAGE_INCREASE: function(card, skill, role) {
				let { p2,p4 } = role.params;

				if(!p2) return { content: '' };

				let content = `每段攻击 | 叠加面板 | ${show(p4)}的${p2/10}%`;
				let title = `${show(p4)}的${p2/10}% 转化为 攻击面板`;

				return { name: '叠加', content: content, title: title };
			},
		// 免疫克制
			ATK_OP_ATTR_RATE_DOWN_INVALID: function() {
				return { name: '免疫克制', content: '攻击时无视元素克制', title: '' };
			},
		// 治疗
			HEAL_FIXED: function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p4 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = Math.floor(~~p0+~~p1/1000*card.max.level);

				let addi = ` | ${base}点 + ${show(p4)}的${p2/10}%`;

				let content = `${target}${addi}`;
				let title = `基础值随等级成长：${p0}+${p1/1000}*等级`;

				return { name: '治疗', content: content, title: title };
			},
		// 治疗 基于参数
			HEAL_BY_SELF_PARAM: function(card, skill, role, skillFirst) {
				let { p0,p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${show(p0)}的${p1/10}%`;
				let title = `基础值随等级成长：${p0}+${p1/1000}*等级`;

				return { name: '治疗', content: content, title: title };
			},
		// 缓回
			REGENERATE_FIXED: function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p3,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = Math.floor(~~p1+~~p2/1000*card.max.level);

				let content = `${target} | ${p0}回合 | ${base}点 + ${p3/10}%${show(p5)}`;
				let title = `治疗时机：回合开始前。基础值随等级成长：${p1}+${p2/1000}*等级`;

				return { name: '持续治疗', content: content, title: title };
			},
		// 支援 根据参数
			ATK_UP_BY_SELF_PARAM: function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p3,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let count = `${p5*card.max.level}点 + ${show(p2)}的${p3/10}%`;

				let content = `${target} | ${p0}回合 | 提升${count}`;
				let title = `基础值随等级成长：${p5}*等级`;

				return { name: `${show(p1)}`, content: content, title: title };
			},
		// 支援
			ATK_UP_FIXED: function(card, skill, role, skillFirst) {
				let { p0,p1,p3,p4 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = Math.floor(~~p3/1000+~~p4/1000*card.max.level);

				let turnText = (skill.style=='BURST_PASSIVE' || skill.style=='PASSIVE') ? '' : ` | ${p0}回合`;

				let content = `${target}${turnText} | 提升${base}点`;
				let title = `基础值随等级成长：${p3/1000}+${p4/1000}*等级`;

				return { name: `${show(p1)}`, content: content, title: title };
			},
		// 伤害强化
			DAMAGE_UP: function(card, skill, role, skillFirst) {
				let { p0,p1,p3,p4 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升${show(p3)}${show(p4)}伤害 | ${p1/10}%`;

				return { name: '伤害强化', content: content, title: '' };
			},
		// 解除Debuff
			DEBUFF_RELEASE_ONE: function(card, skill, role, skillFirst) {
				let { p2,p3 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let db, db1 = show(p2) , db2 = show(p3);

				if(db2 && db1 != db2)
					db = `${db1}、${db2}`;
				else
					db = db1;

				let content = `${target} | ${db}状态`;

				return { name: '解除状态', content: content, title: '' };
			},
		// 免疫克制
			ATTR_RATE_DOWN_INVALID: function(card, skill, role, skillFirst) {
				let { p0 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0} | 攻击时无视元素克制`;

				return { name: '克制免疫', content: content, title: '' };
			},
		// 暴击率提升
			CRITICAL_UP: function(card, skill, role, skillFirst) {
				let { p0,p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升${p1 / 10}%`;

				return { name: '暴击率', content: content, title: '' };
			},
		// 追伤
			ENCHANT: function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p3,p4,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = -1;
				if (~~p3 == 0) {
					base = Math.floor(~~p1*~~p2/1000 + ~~p4 * card.max.level);
				}
				else if(~~p4 == 0) {
					base = Math.floor((~~p2 + ~~p3 * card.max.level) / 1000);
				}
				else {
					L('这个追伤有丶问题');
				}

				let content = `${target} | ${p0}回合 | 每段攻击后 | 追加1段元素攻击 | ${base}点`;
				let title = `等级成长：${p1}+${p4}*等级\r\n纯元素攻击，不带有[物理][魔法]属性。\r\n不触发物魔防御，触发耐性计算`;

				return { name: `${show(p5)} 追伤`, content: content, title: title };
			},
		// 伤害减免
			DAMAGE_CUT: function(card, skill, role, skillFirst) {
				let { p0,p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 所受伤害 | 减免${p1/10}%`;
				let title = '百分比伤害不受减伤影响';

				return { name: '减伤', content: content, title: title };
			},
		// 防御 基于参数
			DEF_UP_BY_SELF_PARAM: function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p3,p4,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = Math.floor(~~p4/1000+~~p5*card.max.level);

				let turnText = (skill.style=='BURST_PASSIVE' || skill.style=='PASSIVE') ? '' : ` | ${p0}回合`;

				let content = `${target}${turnText} | 提升${base}点 +${show(p2)}的${p3/10}%`;
				let title = `基础值随等级成长：${p4/1000}+${p5}*等级`;

				return { name: `${show(p1)}`, content: content, title: title };
			},
		// 防御
			DEF_UP_FIXED: function(card, skill, role, skillFirst) {
				let { p0,p1,p3,p4 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = Math.floor(~~p3/1000+~~p4/1000*card.max.level);

				let content = `${target} | ${p0}回合 | 提升${base}点`;
				let title = `基础值随等级成长：${p3/1000}+${p4/1000}*等级`;

				return { name: `${show(p1)}`, content: content, title: title };
			},
		// 转伤
			DEF_UP_BY_NOW_TURN_DAMAGE: function(card, skill, role, skillFirst) {
				let { p0,p1,p3,p4 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 受到伤害的${p3}% | 转化为 ${show(p1)} | 上限：${p4}`;

				return { name: '复仇', content: content, title: '' };
			},
		// 封印抗性
			CARD_SEAL_REGIST: function(card, skill, role, skillFirst) {
				let { p0,p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升${p1}%`;

				return { name: '封印抗性', content: content, title: '' };
			},
		// 护盾
			ATTACK_BARRIER: function(card, skill, role, skillFirst) {
				let { p0,p1,p3,p4, } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | ${p3}层 | 伤害${p1}点以下无效化`;

				return { name: `${show(p4)}护盾`, content: content, title: '' };
			},
		// 元素护盾
			ATTACK_BARRIER_APPOINT_ATTR: function(card, skill, role, skillFirst) {
				let { p0,p1,p3,p4,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | ${p3}层 | 伤害${p1}点以下无效化`;

				return { name: `${show(p5)}${show(p4)}护盾`, content: content, title: '' };
			},
		// 嘲讽
			COVERING: function(card, skill, role, skillFirst) {
				let { p0,p1,p3,p4 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				if(p3[1] || p4[1] != 3) L('New Params Role 64');

				let content = `${target} | ${p0}回合 | 所受伤害 | 减免${p1/10}%`;

				return { name: '嘲讽', content: content, title: '' };
			},
		// 黑暗抗性
			DARKNESS_REGIST: function(card, skill, role, skillFirst) {
				let { p0,p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升${p1}%`;

				return { name: '黑暗抗性', content: content, title: '' };
			},
		// DEBUFF抗性
			DEBUFF_REGIST: function(card, skill, role, skillFirst) {
				let { p0,p1,p2 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升${p1}%`;

				return { name: `${show(p2)}抗性`, content: content, title: '' };
			},
		// HP减少 百分比
			HP_CUT: function(card, skill, role, skillFirst) {
				let { p0 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | 当前生命的${p0}%`;

				return { name: '损失生命', content: content, title: '' };
			},
		// 解除所有buff
			BUFF_RELEASE: function(card, skill, role, skillFirst) {
				let target = showTarget(skill, role, skillFirst);

				if(~~role.params.p0 != 100 || ~~role.params.p1 > 0)
					L('New Role Param', role.type, 'Card', card.id, 'Skill', skill.id, 'Role', role.id);

				return { name: '解除状态', content: `${target} | 全部BUFF类状态`, title: '' };
			},
		// 弱化 基于参数
			ATK_BREAK_BY_SELF_PARAM: function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p3,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 降低${p5*card.max.level}点 + ${show(p2)}的${p3/10}%`;
				let title = `基础值随等级成长：${p5}*等级`;

				return { name: `${show(p1)}`, content: content, title: title };
			},
		// 弱化
			ATK_BREAK_FIXED: function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p3,p4 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = Math.floor(~~p3/1000+~~p4/1000*card.max.level);
				if(~~p2<=1) {
					let content = `${target} | ${p0}回合 | 降低${base}点`;
					let title = `基础值随等级成长：${p3/1000}+${p4/1000}*等级`;

					return { name: `${show(p1)}`, content: content, title: title };
				}
				else {
					let content = `${target} | ${p0}回合 | 降低${p2*p3/1000}点`;
					let title = '固定值';

					return { name: `${show(p1)}`, content: content, title: title };
				}
			},
		// 防御弱化
			GUARD_BREAK_FIXED: function(card, skill, role, skillFirst) {
				let { p0,p1,p3,p4 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = Math.floor(~~p3/1000+~~p4/1000*card.max.level);

				let content = `${target} | ${p0}回合 | 降低${base}点`;
				let title = `基础值随等级成长：${p3/1000}+${p4/1000}*等级`;

				return { name: `${show(p1)}`, content: content, title: title };
			},
		// 打断
			STAN: function(card, skill, role, skillFirst) {
				let { p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | 机率${p1}%`;

				return { name: '打断行动', content: content, title: '' };
			},
		// 毒
			POISON: function(card, skill, role, skillFirst) {
				let { p0,p3,p4,p5,p7 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = ~~p3+Math.floor(~~p4*card.max.level/1000);

				let content = `${target} | ${p0}回合 | ${base}+${p5/10}%${show(p7)}`;
				let title = `基础值随等级成长：${p3}+${p4/1000}*等级`;

				return { name: '毒', content: content, title: title };
			},
		// 燃烧
			BURN: function(card, skill, role, skillFirst) {
				let { p0,p3,p4,p5,p7 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = ~~p3+Math.floor(~~p4*card.max.level/1000);

				let content = `${target} | ${p0}回合 | ${base}+${p5/10}%${show(p7)}`;
				let title = `基础值随等级成长：${p3}+${p4/1000}*等级`;

				return { name: '燃烧', content: content, title: title };
			},
		// 冻结
			FREEZE: function(card, skill, role, skillFirst) {
				let { p0,p3,p4,p5,p7 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = ~~p3+Math.floor(~~p4*card.max.level/1000);

				let content = `${target} | ${p0}回合 | ${base}+${p5/10}%${show(p7)}`;
				let title = `基础值随等级成长：${p3}+${p4/1000}*等级`;

				return { name: '冻结', content: content, title: title };
			},
		// 裂风
			BLEED: function(card, skill, role, skillFirst) {
				let { p0,p3,p4,p5,p7 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = ~~p3+Math.floor(~~p4*card.max.level/1000);

				let content = `${target} | ${p0}回合 | ${base}+${p5/10}%${show(p7)}`;
				let title = `基础值随等级成长：${p3}+${p4/1000}*等级`;

				return { name: '裂风', content: content, title: title };
			},
		// 感电
			ELECTRIC: function(card, skill, role, skillFirst) {
				let { p0,p3,p4,p5,p7 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = ~~p3+Math.floor(~~p4*card.max.level/1000);

				let content = `${target} | ${p0}回合 | ${base}+${p5/10}%${show(p7)}`;
				let title = `基础值随等级成长：${p3}+${p4/1000}*等级`;

				return { name: '感电', content: content, title: title };
			},
		// 封印
			CARD_SEAL: function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p3,p4,p6,p7 } = role.params;
				let target = showTarget(skill, role, skillFirst);
				let turn = (~~p0 == ~~p1) ? `${~~p0}回合` : `${~~p0}~${~~p1}回合`;
				let num = (~~p2 == ~~p3) ? `${~~p2}张` : `${~~p2}~${~~p3}张`;
				let cost = (~~p6 == ~~p7) ? `${~~p6}Cost` : `${~~p6}~${~~p7}Cost`;

				let content = `${target} | 封印 | ${show(p4)}类型${show(p4)}元素 | ${cost} | ${turn}${num}`;

				return { name: '封印', content: content, title: '' };
			},
		// 标记
			WEAKNESS: function(card, skill, role, skillFirst) {
				let { p0,p1, } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 受到攻击时 | 伤害提升${p1/10}%`;

				return { name: '标记', content: content, title: '' };
			},
		// Cost封印
			COST_BLOCK: function(card, skill, role, skillFirst) {
				let { p0,p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | ${p1}Cost`;

				return { name: 'Cost封印', content: content, title: '' };
			},
		// 陷阱
			CARD_TRAP_DAMAGE: function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p3,p4,p5,p6, } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let num = (p1 == p2 ? p1: `${p1}~${p2}`);

				if(~~p4 || ~~p5 || ~~p6) L('miao?');

				let content = `${target} | ${p0}回合 | 随机${num}张 | 使用后 | 受到伤害${p3}点`;
				let title = '受伤时机：我方卡牌全部发动后、敌方行动前';

				return { name: '陷阱', content: content, title: title };
			},
		// 元素变换
			REWRITE: function(card, skill, role, skillFirst) {
				let { p0,p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | ${show(p1)}`;
				let title = '受伤时机：我方卡牌全部发动后、敌方行动前';

				return { name: '元素变更', content: content, title: title };
			},
		// 抽卡
			DEAL_BONUS: function(card, skill, role, skillFirst) {
				let { p0 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				return { name: '抽卡', content: `${target} | +${p0}`, title: '' };
			},
		// 元素洞察
			ATTR_SEE: function(card, skill, role, skillFirst) {
				let target = showTarget(skill, role, skillFirst);

				if(role.params.p0 != 9999) L('New Params Role 61');

				return { name: '元素洞察', content: `${target} | 显示目标元素`, title: '' };
			},
		// 异常强化
			DOT_VALUE_UP: function(card, skill, role, skillFirst) {
				let { p0,p1,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | 回合+${p0} | 伤害提升${p1}%`;
				let title = `发动条件：处于${show(p5)}状态`;

				return { name: `${show(p5)}强化`, content: content, title: title };
			},
		// 减抽
			DEAL_PENALTY: function(card, skill, role, skillFirst) {
				let { p0 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				return { name: '减抽', content: `${target} | -${p0}`, title: ''};
			},
		// 减耐
			ATTR_DEF_DOWN: function(card, skill, role, skillFirst) {
				let { p0,p3,p4,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = Math.floor(~~p3 + ~~p4 / 1000 * card.max.level);

				let content = `${target} | ${p0}回合 | 降低${base}点`;
				let title = `等级成长：${p3}+${p4/1000}*等级`;

				return { name: `${show(p5)}耐性`, content: content, title: title };
			},
		// 耐性
			ATTR_DEF_UP: function(card, skill, role, skillFirst) {
				let { p0,p3,p4,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = Math.floor(~~p3 + ~~p4 / 1000 * card.max.level);

				let content = `${target} | ${p0}回合 | 提升${base}点`;
				let title = `等级成长：${p3}+${p4/1000}*等级`;

				return { name: `${show(p5)}耐性`, content: content, title: title };
			},
		//反射
			REFLECTION: function(card, skill, role, skillFirst) {
				let { p0,p1,p2 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let base = Math.floor(~~p1 / 100 + ~~p2 / 100 * card.max.level);

				let content = `${target} | ${p0}回合 | 所受伤害的${base}点`;
				let title = `等级成长：${p1/100}+${p2/100}*等级`;

				return { name: '反射伤害', content: content, title: title };
			},
		// 伤害强化
			DAMAGE_BOOST: function(card, skill, role, skillFirst) {
				let { p0,p1,p5,p6 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升${show(p6)}伤害 | ${p1 / 10}%`;
				let title = '技能元素等价于卡面显示的元素';

				return { name: `${show(p5) || '任意'}强化`, content: content, title: title };
			},
		// 伤害支援强化
			ATK_UP_BOOST: function(card, skill, role, skillFirst) {
				let { p0,p3,p5,p6 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升${show(p6)}支援效果 | ${p3 / 10}%`;
				let title = '技能元素等价于卡面显示的元素';

				return { name: `${show(p5) || '任意'}强化`, content: content, title: title };
			},
		// 防御强化
			DEF_UP_BOOST: function(card, skill, role, skillFirst) {
				let { p0,p3,p5,p6 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升${show(p6)}效果 | ${p3 / 10}%`;
				let title = '技能元素等价于卡面显示的元素';

				return { name: `${show(p5) || '任意'}强化`, content: content, title: title };
			},
		// 弱化效果强化
			ATK_BREAK_BOOST: function(card, skill, role, skillFirst) {
				let { p0,p3,p5,p6 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升${show(p6)}弱化效果 | ${p3 / 10}%`;
				let title = '技能元素等价于卡面显示的元素';

				return { name: `${show(p5) || '任意'}强化`, content: content, title: title };
			},
		// 防御弱化效果强化
			GUARD_BREAK_BOOST: function(card, skill, role, skillFirst) {
				let { p0,p3,p5,p6 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升${show(p6)}弱化效果 | ${p3 / 10}%`;
				let title = '技能元素等价于卡面显示的元素';

				return { name: `${show(p5) || '任意'}强化`, content: content, title: title };
			},
		// 治疗效果
			HEAL_BOOST: function(card, skill, role, skillFirst) {
				let { p0,p3,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升治疗效果 | ${p3 / 10}%`;
				let title = '技能元素等价于卡面显示的元素';

				return { name: `${show(p5) || '任意'}强化`, content: content, title: title };
			},
		// 暴击率强化
			CRITICAL_BOOST: function(card, skill, role, skillFirst) {
				let { p0,p1,p3,p4 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升${show(p4)}伤害暴击率 | ${p1 / 10}%`;
				let title = '技能元素等价于卡面显示的元素';

				return { name: `${show(p3) || '任意'}强化`, content: content, title: title };
			},
		// 祝福
			BLESS: function(card, skill, role, skillFirst) {
				let { p0 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				return { name: '祝福', content: `${target} | ${p0}回合`, title: '' };
			},
		// 起始抽牌
			BEGINNING_DRAW: function() {
				return { name: '起始抽牌', content: ' ', title: '' };
			},
		// 祝福回合增加
			BLESS_TURN_UP: function(card, skill, role, skillFirst) {
				let { p0,p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				if(p1[1]) L('New Params Role 143');

				return { name: '祝福回合', content: `${target} | +${p0}`, title: '' };
			},
		// 上限提升
			PARAM_LIMIT_BREAK_FIXED: function(card, skill, role, skillFirst) {
				let { p0,p1,p3,p4 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let turnText = (skill.style=='BURST_PASSIVE' || skill.style=='PASSIVE') ? '' : ` | ${p0}回合`;

				let base = Math.floor(~~p3/1000+~~p4/1000*card.max.level);

				let content = `${target}${turnText} | 提升上限${base}点`;
				let title = `基础值随等级成长：${p3/1000}+${p4/1000}*等级`;

				return { name: `${show(p1)}`, content: content, title: title };
			},
		// 奋起
			GUTS: function(card, skill, role, skillFirst) {
				let { p0,p1,p2 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 目标死亡时免疫死亡 | 恢复${p2}%HP | 最多${p1}次`;

				return { name: '奋起', content: content, title: '' };
			},
		// 解放进度提升
			BURST_GAUGE_QUICK_UP: function(card, skill, role, skillFirst) {
				let { p0 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				return { name: '解放进度', content: `${target} | 提升${p0}%`, title: '' };
			},
		// 暴击伤害强化
			CRITICAL_DAMAGE_BOOST: function(card, skill, role, skillFirst) {
				let { p0,p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 提升暴击伤害 | ${p1}%`;
				let title = '技能元素等价于卡面显示的元素';

				return { name: '暴伤强化', content: content, title: title };
			},
		// cost减少
			NEED_COST_DOWN_BURST : function(card, skill, role, skillFirst) {
				let { p0,p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				if(p0 > 1)
					L(`card ${card.id} NEED_COST_DOWN_BURST?`);

				let content = `${target} | ${showHand(skill.hand)} | 减少${p1}`;

				return { name: 'Cost', content: content, title: '' };
			},
		// 防御穿透
			ADD_ATK_OP_PIERCING: function(card, skill, role, skillFirst) {
				let { p0,p1 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				if(p0 > 1)
					L('ADD_ATK_OP_PIERCING?');

				let content = `${target} | ${showHand(skill.hand)} | 无视对应防御 | ${p1}%`;

				return { name: '穿透', content: content, title: '' };
			},
		// 重抽
			DISCARD_DRAW : function(card, skill, role, skillFirst) {
				let { p0 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | 保留最多${showHand(skill.hand)} | 最多${p0}张`;

				return { name: '重抽', content: content, title: '' };
			},
		// 段数追加
			ATTACK_MULTISTAGE : function(card, skill, role, skillFirst) {
				let { p1,p2 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${showHand(skill.hand)} | 追加${show(p1)}攻击 | ${p2}次`;

				return { name: '段数追加', content: content, title: '追加的攻击面板与原攻击相同' };
			},
		// 心像防御
			DEF_UP_BOOST_ORDER_TRIBAL : function(card, skill, role, skillFirst) {
				let { p0,p3,p6,p9 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				if(p0 > 1)
					L('DEF_UP_BOOST_ORDER_TRIBAL?');

				let content = `${target} | ${showHand(skill.hand)} | 目标心像为[${show(['tribal', p9])}] | 提升${p3/10}%`;

				return { name: `${show(p6)}`, content: content, title: '追加的攻击面板与原攻击相同' };
			},
		// 心像攻击
			ATK_UP_BOOST_ORDER_TRIBAL: function(card, skill, role, skillFirst) {
				let { p0,p3,p6,p9 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				if(p0 > 1)
					L('ATK_UP_BOOST_ORDER_TRIBAL?');

				let content = `${target} | ${showHand(skill.hand)} | 目标心像为[${show(['tribal', p9])}] | 提升${p3/10}%`;

				return { name: `${show(p6)}支援`, content: content, title: '' };
			},
		// 心像攻击
			DAMAGE_BOOST_ORDER_TRIBAL: function(card, skill, role, skillFirst) {
				let { p0,p3,p6,p9 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				if(p0 > 1)
					L('DAMAGE_BOOST_ORDER_TRIBAL?');

					let content = `${target} | ${showHand(skill.hand)} | 目标心像为[${show(['tribal', p9])}] | 提升${p3/10}%`;

					return { name: `${show(p6)}`, content: content, title: '追加的攻击面板与原攻击相同' };
			},
			PARAM_UP_SKILL_BONUS: async function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p3,p4,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				if(~~p1 != 5 || ~~p2 != 0 || ~~p3 != 0 || ~~p5 != 0) L('PARAM_UP_SKILL_BONUS1');
				if(skill.role.length != 2) L('PARAM_UP_SKILL_BONUS2');

				let upRole = skill.role[0] == role ? skill.role[1] : skill.role[0];

				let rend = (await require('./role')(serv))[upRole.type];

				let upCont = (await rend(card, skill, upRole, skillFirst)).content;

				let point = upCont.match(/(提升|降低|提升上限|降低上限)(\d+)/);

				let content = '';
				if(point.length == 3) {
					let base = Math.round(point[2]*p1/100);
					content = `${target} | 主卡组每张 | ${show(p4)}卡 | 额外${point[1]} | ${base}点(${point[2]}的${p1}%)`;
				}
				else {
					L('PARAM_UP_SKILL_BONUS3');
				}

				return { name: `${show(p0)}`, content: content, title: '该技能本质上是针对单个支援技能的EX技能\r\n根据主卡组符合条件的卡数量提升' };
			},
			LIMIT_BREAK_BONUS: async function(card, skill, role, skillFirst) {
				let { p0,p1,p2,p3,p4,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				if(~~p1 != 5 || ~~p2 != 0 || ~~p3 != 0 || ~~p5 != 0) L('LIMIT_BREAK_BONUS1');
				if(skill.role.length != 2) L('LIMIT_BREAK_BONUS2');

				let upRole = skill.role[0] == role ? skill.role[1] : skill.role[0];

				let rend = (await require('./role')(serv))[upRole.type];

				let upCont = (await rend(card, skill, upRole, skillFirst)).content;

				let point = upCont.match(/(提升|降低|提升上限|降低上限)(\d+)/);

				let content = '';
				if(point && point.length == 3) {
					let base = Math.round(point[2]*p1/100);
					content = `${target} | 主卡组每张 | ${show(p4)}卡 | 额外${point[1]} | ${base}点(${point[2]}的${p1}%)`;
				}
				else {
					L('LIMIT_BREAK_BONUS3');
				}

				return { name: `${show(p0)}`, content: content, title: '该技能本质上是针对单个支援技能的EX技能\r\n根据主卡组符合条件的卡数量提升' };
			},
		// 伤害减免
			ATTR_CUT_ATTACK: async function(card, skill, role, skillFirst) {
				let { p0,p2,p4,p5 } = role.params;
				let target = showTarget(skill, role, skillFirst);

				let content = `${target} | ${p0}回合 | 受到的[${show(p4)}][${show(p5)}]伤害 | 减免${p2/10}%`;
				let title = '百分比伤害不受减伤影响';

				return { name: '减伤', content: content, title: title };
			},
		};
	};