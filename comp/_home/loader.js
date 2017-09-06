import Vue from 'Vue';

export default async function(name) {
	if(!Vue.component(name)) {
		switch (name) {
			case 'subTest': Vue.component(name, (await System.import('../test/test.vue')).default); break;
			case 'subHhhh': Vue.component(name, (await System.import('../hhhh/hhhh.vue')).default); break;
		}
	}
}