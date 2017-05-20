module.exports = ($) => {
	let filter = $.rq('filter');

	return (emit) => {
		return {
			query: (query) => {
				emit('query', filter(query, [
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
				]));
			},
			conds: () => {
				emit('conds', $.rq('data/conds'));
			}
		};
	};
};