module.exports = () => {
	return (valuer, cards, skils, roles, rules, supss, suprs, evols) => {
		let result = {},
			dictSkil = {}, dictRole = {}, dictRule = {}, dictEvol = {};

		for(let rule of rules) dictRule[rule.id] = rule;

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

		for(let skil of skils) {
			skil.role = dictRole[skil.role] || [];

			(dictSkil[skil.id] || (dictSkil[skil.id] = [])).push(skil);
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

			card.evol = dictEvol[card.id] || [];

			result[card.id] = card;
		}

		return result;
	};
};