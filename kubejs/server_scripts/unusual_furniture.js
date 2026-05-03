ServerEvents.recipes(event => {
	// craft screws back into ingots
	event.shapeless(
		Item.of('minecraft:iron_nugget', 2), // arg 1: output
		[
			'unusual_furniture:screw',
		]
	)

	event.remove({ output: 'unusual_furniture:tropical_plant' })
	event.remove({ output: 'unusual_furniture:mushroom_patch' })
	event.remove({ output: 'unusual_furniture:water_plants' })
	event.remove({ output: 'unusual_furniture:pebble_bag' })
	event.remove({ output: 'unusual_furniture:decorative_toolbox' })
})


