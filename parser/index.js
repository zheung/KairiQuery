require('./init');

let csv = require('./parser-csv'), merge = require('./merge');

let dirRaw1 = path.join(dir, 'raw1'), dirRaw2 = path.join(dir, 'raw2');

let card2 = csv('card', dirRaw1, 11, true, true, true);
fs.writeFileSync(path.join(dirRaw2, 'card.json'), JSON.stringify(card2, null, '\t'));

let skill2 = csv('skill', dirRaw1, 1, true, true, true);
fs.writeFileSync(path.join(dirRaw2, 'skill.json'), JSON.stringify(skill2, null, '\t'));

let role2 = csv('role', dirRaw1, 1, true, true, true);
fs.writeFileSync(path.join(dirRaw2, 'role.json'), JSON.stringify(role2, null, '\t'));

let rule2 = csv('rule', dirRaw1, 1, true, true, true);
fs.writeFileSync(path.join(dirRaw2, 'rule.json'), JSON.stringify(rule2, null, '\t'));

let data = merge(card2, skill2, role2, rule2);
fs.writeFileSync(path.join(dirRaw2, 'data.json'), JSON.stringify(data, null, '\t'));

// let l1 = role2[0].split(','), l2 = role2[1].split(','), hs = [];

// l1.forEach((c1, i) => {
// 	hs.push(c1+l2[i]);
// });

ll('done');