let hasPlus = (cards, id, lastRare) => {
	let card = cards[id], rare = card.info.rare;

	if(!lastRare && (rare == 61 || rare == 62 || rare == 7))
		return '0';
	else if(card.info.rare == 7)
		return '1';
	else if(lastRare == card.info.rare)
		return false;

	for(let evol of card.evol)
		if(evol.type == 'NORMAL' || evol.type == 'LIMIT')
			if(hasPlus(cards, evol.target, card.info.rare))
				return '1';

	return '0';
};

module.exports = async(valuer, marker, cards, skils, roles, rules, supss, suprs, evols) => {
	let result = [[], {}],
		dictSkil = {}, dictRole = {}, dictRule = {}, dictCard = {},
		dictSups = {}, dictSupr = {}, dictEvol = {};

	for(let rule of rules) dictRule[rule.id] = rule;
	for(let card of cards) dictCard[card.id] = card;

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

		if(dictSkil[card.skill.call]) {
			L();
		}

		card.skill.call = dictSkil[card.skill.call] || [];

		delete card.skill.suport;

		card.evol = dictEvol[card.id] || [];

		card.mark = marker(card);

		result[0].push(card);
		result[1][card.id] = card;
	}

	for(let card of cards) {
		card.info.rare = ~~(card.info.rare+hasPlus(dictCard, card.id));
	}

	return result;
};