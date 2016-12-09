let hasMega = (cards, id, lastRare) => {
	let card = cards[id], rare = card.info.rare;

	if(!lastRare && (rare == 61 || rare == 62 || rare == 7))
		return false;
	else if(card.info.rare == 7)
		return true;
	else if(lastRare == card.info.rare)
		return false;

	for(let evol of card.evol)
		if(evol.type == 'NORMAL' || evol.type == 'LIMIT')
			if(hasMega(cards, evol.target, card.info.rare))
				return true;

	return false;
};

module.exports = () => {
	return (valuer, cards, skils, roles, rules, supss, suprs, evols) => {
		let result = {},
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

			(dictRole[role.id] || (dictRole[role.id] = [])).push(role);
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

			(dictSupr[supr.id] || (dictSupr[supr.id] = [])).push(supr);
		}

		for(let skil of skils) {
			skil.role = dictRole[skil.role] || [];

			(dictSkil[skil.id] || (dictSkil[skil.id] = [])).push(skil);
		}
		for(let sups of supss) {
			sups.role = dictSupr[sups.role] || [];

			(dictSups[sups.id] || (dictSups[sups.id] = [])).push(sups);
		}

		for(let evol of evols) {
			if(!evol.type) continue;

			for(let id of Object.keys(evol.matter))
				if(!evol.matter[id].fame)
					delete evol.matter[id];

			(dictEvol[evol.id] || (dictEvol[evol.id] = [])).push(evol);
		}

		for(let card of cards) {
			card.skill.normal = dictSkil[card.skill.normal] || [];
			card.skill.awaken = dictSkil[card.skill.awaken] || [];

			card.skill.suport1 = dictSups[card.skill.suport[1]] || [];
			card.skill.suport2 = dictSups[card.skill.suport[2]] || [];
			card.skill.suport3 = dictSups[card.skill.suport[3]] || [];

			delete card.skill.suport;

			card.evol = dictEvol[card.id] || [];

			result[card.id] = card;
		}

		for(let card of cards)
			if(hasMega(dictCard, card.id))
				card.info.rare = ~~(card.info.rare+'0');

		return result;
	};
};