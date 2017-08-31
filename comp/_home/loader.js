export default async function(name) {
	switch (name) {
		case 'test': return await System.import('../test/test.vue');
		case 'hhhh': return await System.import('../hhhh/hhhh.vue');
	}
}