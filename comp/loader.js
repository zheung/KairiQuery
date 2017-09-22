import Vue from 'Vue';

export default async function(name) {
	if(!Vue.component(name)) {
		switch (name) {
			case 'iconMaker': Vue.component(name, (await System.import('./iconMaker/iconMaker.vue')).default); break;
			case 'cardQuery': Vue.component(name, (await System.import('./cardQuery/cardQuery.vue')).default); break;
		}
	}
}