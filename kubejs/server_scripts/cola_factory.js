// Flat Soda is gone: the syrup takes all the water, then syrup + CO2 carbonate straight into soda.
// (A basin only holds two input fluids, so syrup, water and CO2 can't go into one mix.)
// Each sugar now makes 1000 mB of soda, one full can.
ServerEvents.recipes(event => {
	const fluid = (id, amount) => ({ type: 'neoforge:single', fluid: id, amount: amount })

	const replaced = [
		'coca_cola_syrup_mixing', 'coca_cola_syrup_zero_mixing',
		'flat_coca_cola_mixing', 'flat_coca_cola_zero_mixing',
		'coca_cola_mixing', 'coca_cola_zero_mixing',
		'flat_coca_cola_emptying', 'flat_coca_cola_zero_emptying'
	]
	replaced.forEach(id => event.remove({ id: `create_cola_factory:${id}` }))

	const lines = [
		{ sweetener: 'minecraft:sugar', syrup: 'create_cola_factory:coca_cola_syrup', soda: 'create_cola_factory:coca_cola' },
		{ sweetener: 'create_cola_factory:artificial_sweetener', syrup: 'create_cola_factory:coca_cola_syrup_zero', soda: 'create_cola_factory:coca_cola_zero' }
	]
	lines.forEach(line => {
		event.custom({
			type: 'create:mixing',
			heat_requirement: 'heated',
			ingredients: [{ item: line.sweetener }, { item: 'minecraft:cocoa_beans' }, fluid('minecraft:water', 1000)],
			results: [{ id: line.syrup, amount: 1000 }]
		})
		event.custom({
			type: 'create:mixing',
			ingredients: [fluid(line.syrup, 1000), fluid('create_cola_factory:carbon_dioxide', 50)],
			results: [{ id: line.soda, amount: 1000 }]
		})
	})
})
