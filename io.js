module.exports = async($) => {
	let queryer = await $.rq('libs/queryer'), paramer = await $.rq('libs/paramer');

	return async(emit) => {
		return {
			query: async(conds) => {
				conds.word = conds.word? conds.word.trim() : '';
				conds.zero = !!~~conds.zero;

				conds.mark = conds.mark.split('|');
				for(let i in conds.mark)
					conds.mark[i] = ~~conds.mark[i];

				let mark = conds.mark,
					result = await queryer(
						[
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
						],
						paramer.main(conds),
						conds.prio ? { 'extra.prio.pvp': 1 } : {},
						conds.serv, conds.page, $.conf.pageEvery
					);

				await emit('query', result, (mark && !/^(\||0)+$/.test(mark)) ? mark : undefined);
			},
			conds: async() => {
				await emit('conds', await $.rq('data/conds'));
			},
			gur: async(conds) => {
				let result = await queryer(
						[
							'id',
							['info.name', 'name'],
							['info.title', 'title'],
							['info.star', 'star', 'd.shower.star'],
							['skill.normal.0.info.cost', 'cost'],
							['skill.normal.0.info.job', 'job', 'd.shower.job'],
							['this', 'kind', 'f.skillKind'],
							['info.rare', 'rare', 'd.shower.rare'],
							['skill.normal.0.info.attr', 'attr', 'd.shower.attr'],
							['this', 'skill', 'f.skill']
						],
						paramer.gur(conds), {}, conds.serv, conds.page, conds.every
					);

				await emit('gur', result);
			}
		};
	};
};