let skillTypes = ['awaken', 'normal'];

module.exports = {
	rare: (card) => {
		let rare = card.info.rare;

		if(rare==1) return ['n'];
		if(rare==2) return ['hn'];
		if(rare==3) return ['r'];
		if(rare==4) return ['sr'];
		if(rare==5) return ['ur'];
		if(rare==6) return ['mr'];
		if(rare==61) return ['mr+'];
		if(rare==62) return ['mr++'];
		if(rare==7) return ['mmr'];
	},
	cost: (card) => {
		let cost = (card.skill.awaken[0] || card.skill.normal[0]).info.cost;

		if(cost > 0)
			return ['cost'+cost];
		else
			return [];
	},
	attr: (card) => {
		let result = [], attr = (card.skill.awaken[0] || card.skill.normal[0]).info.attr;

		if(1+(attr+'').indexOf('1')) result.push('fire');
		if(1+(attr+'').indexOf('2')) result.push('ice');
		if(1+(attr+'').indexOf('3')) result.push('wind');
		if(1+(attr+'').indexOf('4')) result.push('light');
		if(1+(attr+'').indexOf('5')) result.push('dark');

		return result;
	},
	job: (card) => {
		let job = (card.skill.awaken[0] || card.skill.normal[0]).info.job;

		if(job==1) return ['mercenary'];
		if(job==2) return ['millionaire'];
		if(job==3) return ['thief'];
		if(job==4) return ['singer'];
		if(job==5) return ['null'];
	},
	skillKind: (card) => {
		let skillKind = (card.skill.awaken[0] || card.skill.normal[0]).info.kind;

		if(skillKind==1) return ['attack'];
		if(skillKind==2) return ['sorcery'];
		if(skillKind==3) return ['recovery'];
		if(skillKind==4) return ['support'];
		if(skillKind==5) return ['defense'];
		if(skillKind==6) return ['jamming'];
		if(skillKind==7) return ['special'];
	},
	aoe: (card) => {
		for(let st of skillTypes) {
			let first = card.skill[st][0];

			for(let skill of card.skill[st])
				for(let role of skill.role) {
					let t = { r: role.target, s: skill.info.target || first.info.target };

					if(role.type == 1)
						if(t.r == 4 || (t.r == 1 && t.s == 5))
							return ['aoe'];
				}
		}

		return [];
	},
	db2: (card) => {
		for(let st of skillTypes)
			for(let skill of card.skill[st])
				for(let role of skill.role)
					if(role.type == 44 && role.params[1] == '2')
						return ['db2'];

		return [];
	},
	covering: (card) => {
		for(let st of skillTypes)
			for(let skill of card.skill[st])
				for(let role of skill.role)
					if(role.type == 64)
						return ['covering'];

		return [];
	},
	buffone: (card) => {
		for(let st of skillTypes) {
			let first = card.skill[st][0];

			for(let skill of card.skill[st])
				for(let role of skill.role) {
					let t = { r: role.target, s: skill.info.target || first.info.target };

					if(role.type == 19)
						if(t.r == 1 && t.s == 2)
							return ['buffone'];
				}
		}

		return [];
	},
	stan: (card) => {
		for(let st of skillTypes)
			for(let skill of card.skill[st])
				for(let role of skill.role)
					if(role.type == 35)
						return ['stan'];

		return [];
	},
	debuffre: (card) => {
		for(let st of skillTypes)
			for(let skill of card.skill[st])
				for(let role of skill.role)
					if(role.type == 46)
						return ['debuffre'];

		return [];
	},
	bug: (card) => {
		for(let st of skillTypes) {
			let first = card.skill[st][0];

			for(let skill of card.skill[st]) {
				let heal = false, healAll = false, up = false;

				for(let role of skill.role) {
					let t = { r: role.target, s: skill.info.target || first.info.target };

					if(t.r == 3 || (t.r == 1 && t.s == 3))
						healAll = true;

					if(role.type == 9)
						heal = true;
					else if(role.type == 19 && role.params[2][1] == 5)
						up = true;
				}

				if(heal && healAll && up) return ['bug'];
			}
		}

		return [];
	},
	enchant: (card) => {
		for(let st of skillTypes)
			for(let skill of card.skill[st])
				for(let role of skill.role)
					if(role.type == 107)
						return ['enchant'];

		return [];
	},
	chain: (card) => {
		for(let st of skillTypes)
			for(let skill of card.skill[st])
				if(skill.info.chain && (skill.info.chain != 20 && skill.info.chain != 1))
					return ['chain'];

		return [];
	},
	crit: (card) => {
		for(let st of skillTypes)
			for(let skill of card.skill[st])
				for(let role of skill.role)
					if(role.type == 86)
						return ['crit'];

		return [];
	},
	ex: (card) => {
		if(card.skill['suport3'].length)
			return ['ex'];
		else
			return [];
	},
	pierce: (card) => {
		for(let st of skillTypes)
			for(let skill of card.skill[st])
				for(let role of skill.role)
					if(role.type == 7)
						return ['pierce'];

		return [];
	}
};