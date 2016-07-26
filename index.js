require('./init');

let csv = require('./parser-csv');

let card2 = csv('card', path.join(dir, 'raw1'), 11, true, true, true);
fs.writeFileSync(path.join(dir, 'raw2', 'card.json'), JSON.stringify(card2, null, '\t'));

let skill2 = csv('skill', path.join(dir, 'raw1'), 1, true, true, true);
fs.writeFileSync(path.join(dir, 'raw2', 'skill.json'), JSON.stringify(skill2, null, '\t'));

let role2 = csv('skill_role', path.join(dir, 'raw1'), 1, true, true, true);
fs.writeFileSync(path.join(dir, 'raw2', 'role.json'), JSON.stringify(role2, null, '\t'));

// let l1 = role2[0].split(','), l2 = role2[1].split(','), hs = [];

// l1.forEach((c1, i) => {
// 	hs.push(c1+l2[i]);
// });

ll('done');