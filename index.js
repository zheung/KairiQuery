require('./init');

let csv = require('./parser-csv');

let card2 = csv('card', path.join(dir, 'raw1'), 11, true, true, true);

// ll(card2);

fs.writeFileSync(path.join(dir, 'raw2', 'card.json'), JSON.stringify(card2, null, '\t'));