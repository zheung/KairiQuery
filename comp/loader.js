import Vue from 'Vue';

export default async function(name) {
	if(!Vue.component(name)) {
		switch (name) {
			case 'iconMaker': Vue.component(name, (await System.import('./iconMaker/_iconMaker.vue')).default); break;
			case 'cardQuery': Vue.component(name, (await System.import('./cardQuery/_cardQuery.vue')).default); break;
			case 'test': Vue.component(name, (await System.import('./test/_test.vue')).default); break;
		}
	}
}