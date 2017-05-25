module.exports = async($) => {
	let filter = await $.rq('filter');

	return async(emit) => {
		return {
			query: async(query) => {
				let a = await filter(query, [
					'id',
					['info.name', 'name'],
					['info.title', 'title'],
					['info.star', 'star', 'd.shower.star'],
					['figure.hp.max', 'hp'],
					['figure.ad.max', 'ad'],
					['figure.ap.max', 'ap'],
					['figure.hq.max', 'hq'],
					['skill.normal.0.info.cost', 'cost'],
					['skill.normal.0.info.job', 'job', 'd.shower.job'],
					['this', 'kind', 'f.skillKind'],
					['info.rare', 'rare', 'd.shower.rare'],
					['skill.normal.0.info.attr', 'attr', 'd.shower.attr'],
					['this', 'skill', 'f.skill']
				]);
				await emit('query', a);
			},
			conds: async() => {
				await emit('conds', await $.rq('data/conds'));
			}
		};
	};
};