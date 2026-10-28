// Carbon Dioxide (Cola Factory: limestone in a superheated mixer) is used for more than soda.
ServerEvents.recipes(event => {
	const co2 = amount => ({ type: 'neoforge:single', fluid: 'create_cola_factory:carbon_dioxide', amount: amount })

	// Hybrid Aquatic's Aerated Sand (for bubble geysers) is sand filled with gas; the 8 sand + pearl recipe stays
	event.custom({
		type: 'create:filling',
		ingredients: [{ item: 'minecraft:sand' }, co2(250)],
		results: [{ id: 'hybrid_aquatic:aerated_sand' }]
	})

	// marshmallows are whipped with CO2 instead of water
	event.remove({ id: 'create_confectionery:marshmallow_recipe' })
	event.custom({
		type: 'create:mixing',
		heat_requirement: 'heated',
		ingredients: [{ item: 'minecraft:sugar' }, { item: 'minecraft:sugar' }, { item: 'minecraft:slime_ball' }, co2(250)],
		results: [{ id: 'create_confectionery:marshmallow', count: 8 }]
	})

	// dry ice stands in for the four snowballs; the snowball recipe stays
	event.custom({
		type: 'create:mixing',
		ingredients: [{ item: 'minecraft:sugar' }, { type: 'neoforge:tag', tag: 'c:milk', amount: 250 }, co2(100)],
		results: [{ id: 'farmersdelight_extended:icecream_scoop' }]
	})

	// plants feed on CO2: Slice & Dice's sprinkler fertilizer from bone meal
	event.custom({
		type: 'create:mixing',
		ingredients: [{ item: 'minecraft:bone_meal' }, { type: 'neoforge:single', fluid: 'minecraft:water', amount: 250 }, co2(50)],
		results: [{ id: 'sliceanddice:fertilizer', amount: 250 }]
	})
})
