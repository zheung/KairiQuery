module.exports = (card) => {
	let skillTypes = ['awaken', 'normal', 'support'];

	for(let st of skillTypes)
		for(let skill of card.skill[st])
			for(let role of skill.role)
				if(role.info.type == 44 && role.params[1] == '2')
					return true;

	return false;
};