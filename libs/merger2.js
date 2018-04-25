let hasPlus = (cards, id, ids = []) => {
	let card = cards[id], rare = card.info.rare;

	if(ids.indexOf(id)+1)
		return 0;
	else if(card.info.plus && !ids.length)
		return card.info.plus+1;
	else if(card.info.plus || rare == 7 || rare == 71)
		return 1;
	else
		for(let evol of card.evol) {
			if(evol.type == 'NORMAL')
				return hasPlus(cards, evol.target, (ids.push(id) && 0) || ids);
			else if(evol.type == 'LIMIT')
				return 1;
		}

	return 0;
};
let hasMMR = (cards, id, ids = []) => {
	let card = cards[id], rare = card.info.rare;

	if(ids.indexOf(id)+1)
		return 0;
	else if(rare == 7 || rare == 71)
		return 1;
	else {
		for(let evol of card.evol) {
			if(hasMMR(cards, evol.target, (ids.push(id) && 0) || ids))
				return 1;
		}

		return 0;
	}
};

module.exports = async(serv, valuer, marker, cards, skils, roles, rules, supss, suprs, evols) => {
	let result = [[], {}],
		dictSkil = {}, dictRole = {}, dictRule = {}, dictCard = {},
		dictSups = {}, dictSupr = {}, dictEvol = {};

	for(let rule of rules)
		dictRule[rule.name] = rule;
	for(let card of cards)
		dictCard[card.id] = card;

	for(let role of roles) {
		if(role.type) {
			let rule = dictRule[role.type];

			for(let index in rule.types) {
				let type = rule.types[index];

				if(type && type != 1)
					role.params[index] = [type, valuer[type][role.params[index]]];
			}
		}

		let dict = dictRole[role.id] || (dictRole[role.id] = []);

		dict.push(role);
	}

	for(let supr of suprs) {
		if(supr.type) {
			let rule = dictRule[supr.type];

			for(let index in rule.types) {
				let type = rule.types[index];

				if(type && type != 1)
					supr.params[index] = [type, valuer[type][supr.params[index]]];
			}
		}

		let dict = dictSupr[supr.id] || (dictSupr[supr.id] = []);

		dict.push(supr);
	}

	for(let skil of skils) {
		skil.role = dictRole[skil.role] || [];

		let dict = dictSkil[skil.id] || (dictSkil[skil.id] = []);

		dict.push(skil);
	}

	for(let sups of supss) {
		sups.role = dictSupr[sups.role] || [];

		let dict = dictSups[sups.id] || (dictSups[sups.id] = []);

		dict.push(sups);
	}

	for(let evol of evols) {
		if(!evol.type) continue;

		for(let id of Object.keys(evol.matter))
			if(!evol.matter[id].fame)
				delete evol.matter[id];

		let dict = dictEvol[evol.id] || (dictEvol[evol.id] = []);

		dict.push(evol);
	}

	for(let card of cards) {
		card.skill.normal = dictSkil[card.skill.normal] || [];
		card.skill.awaken = dictSkil[card.skill.awaken] || [];

		card.skill.suport1 = dictSups[card.skill.suport ? card.skill.suport[1] : undefined] || [];
		card.skill.suport2 = dictSups[card.skill.suport ? card.skill.suport[2] : undefined] || [];
		card.skill.suport3 = dictSups[card.skill.suport ? card.skill.suport[3] : undefined] || [];

		card.skill.bless = dictSkil[card.skill.bless] || [];

		delete card.skill.suport;

		card.evol = dictEvol[card.id] || [];

		result[0].push(card);
		result[1][card.id] = card;

	}

	for(let card of cards) {
		card.info.rare = ~~(`${card.info.rare}${hasPlus(dictCard, card.id)}`);
		card.info.mmr = hasMMR(dictCard, card.id);

		card.rend = await render(serv, card, [
			'id',
			['info.name', 'name'],
			['info.title', 'title'],
			['info.star', 'star', 'd.shower.star'],
			['figure.hp.max', 'hp'],
			['figure.ad.max', 'ad'],
			['figure.ap.max', 'ap'],
			['figure.hq.max', 'hq'],
			['skill.normal.0.info.cost', 'cost'],
			['skill.awaken.0.info.cost', 'cost'],
			['skill.normal.0.info.job', 'job', 'd.shower.job'],
			['skill.awaken.0.info.job', 'job', 'd.shower.job'],
			['this', 'kind', 'f.skillKind'],
			['info.rare', 'rare', 'd.shower.rare'],
			['skill.normal.0.info.attr', 'attr', 'd.shower.attr'],
			['skill.awaken.0.info.attr', 'attr', 'd.shower.attr'],
			['this', 'skill', 'f.skill'],
			['this', 'prio', 'f.prio'],
			['evol', 'evol'],
			['skill.normal.0.info.attr', 'raw.attr'],
			['skill.awaken.0.info.attr', 'raw.attr'],
			['skill.normal.0.info.job', 'raw.job'],
			['skill.awaken.0.info.job', 'raw.job'],
			['info.rare', 'raw.rare'],
			['pict.normal', 'pict']
		]);

		delete card.skill;
		delete card.line;
		delete card.profile;
		delete card.pict;
		delete card.figure;
	}

	return result;
};