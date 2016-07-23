require('./init');

let csv = require('./parser-csv');

let card2 = csv('card', path.join(dir, 'raw1'), 11, true, true, true);
fs.writeFileSync(path.join(dir, 'raw2', 'card.json'), JSON.stringify(card2, null, '\t'));

let skill2 = csv('skill', path.join(dir, 'raw1'), 1, true, true, true);
fs.writeFileSync(path.join(dir, 'raw2', 'skill.json'), JSON.stringify(skill2, null, '\t'));

// ll(JSON.stringify(skill2[0].split(','),null,'\t'));

ll('done');