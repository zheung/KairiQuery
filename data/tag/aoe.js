module.exports = (card) => {
	let skillTypes = ['awaken', 'normal', 'support'];

	for(let st of skillTypes)
		for(let skill of card.skill[st])
			for(let role of skill.role)
				if(role.info.type == 1)
					if(role.info.target == 5 || (role.info.target == 1 && skill.info.target == 5))
						return true;

	return false;
};