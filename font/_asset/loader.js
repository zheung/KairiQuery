import Vue from 'Vue';

export default async function(type, time = 0) {
	if(!Vue.component(type)) {
		switch (type) {
			case 'iconMaker': Vue.component(`${type}_${time}`, (await System.import('../iconMaker/_iconMaker.vue')).default); break;
			case 'cardQuery': Vue.component(`${type}_${time}`, (await System.import('../cardQuery/_cardQuery.vue')).default); break;
			case 'cardQueryDash': Vue.component(`${type}_${time}`, (await System.import('../cardQuery/dash/_cardQueryDash.vue')).default); break;
		}
	}
}