import Vue from 'Vue';

export default async function(type, time = 0) {
	if(!Vue.component(type)) {
		switch (type) {
			case 'iconMaker': Vue.component(`${type}_${time}`, (await System.import('../iconMaker/_iconMaker.vue')).default); break;
			case 'calendar': Vue.component(`${type}_${time}`, (await System.import('../calendar/_calendar.vue')).default); break;
			case 'cardQuery': Vue.component(`${type}_${time}`, (await System.import('../cardQuery/_cardQuery.vue')).default); break;
			case 'cardQueryDash': Vue.component(`${type}_${time}`, (await System.import('../cardQuery/dash/_cardQueryDash.vue')).default); break;
			case 'budyQuery': Vue.component(`${type}_${time}`, (await System.import('../budyQuery/_budyQuery.vue')).default); break;
			case 'budyQueryDash': Vue.component(`${type}_${time}`, (await System.import('../budyQuery/dash/_budyQueryDash.vue')).default); break;
			case 'damgCalc': Vue.component(`${type}_${time}`, (await System.import('../damgCalc/_damgCalc.vue')).default); break;
			// case 'damgCalcDash': Vue.component(`${type}_${time}`, (await System.import('../damgCalc/dash/_damgCalcDash.vue')).default); break;
		}
	}
}