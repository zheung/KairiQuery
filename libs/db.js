let connect;

module.exports = async(dbname) => {
	if(!connect)
		connect = await require('mongodb').MongoClient.connect('mongodb://127.0.0.1:5211/');

	let db = connect.db(dbname);

	return {
		coll: async(collname) => {
			let coll = db.collection(collname);

			return {
				find: async(query) => {
					return coll.find(query);
				},
				drop: async() => {
					return await coll.drop();
				},
				insert: async(arr) => {
					return await coll.insertMany(arr);
				},
				renew: async(arr) => {
					try {
						await coll.drop();
					}
					catch(e) {
						if(e.code != 26) console.error(e);
					}

					return await coll.insertMany(arr);
				}
			};
		}
	};
};