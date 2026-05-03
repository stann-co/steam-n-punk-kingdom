ServerEvents.recipes(event => {
	// craft screws back into ingots
	event.shapeless(
		Item.of('minecraft:iron_nugget', 2), // arg 1: output
		[
			'unusual_furniture:screw',
		]
	)

	// craft pig plushie
	event.shaped(
		Item.of('unusual_furniture:pig_plush', 1), // arg 1: output
		[
			' AA',
			'ABA', // arg 2: the shape (array of strings)
			'AA '
		],
		{
			A: 'minecraft:pink_wool',  //arg 3: the mapping object
			B: 'unusual_furniture:screw',
		}
	)

	// craft pig plushie
	event.shaped(
		Item.of('unusual_furniture:cow_plush', 1), // arg 1: output
		[
			' AC',
			'ABA', // arg 2: the shape (array of strings)
			'CA '
		],
		{
			A: 'minecraft:brown_wool',  //arg 3: the mapping object
			B: 'unusual_furniture:screw',
			C: 'minecraft:white_wool',
		}
	)

	// craft pig plushie
	event.shaped(
		Item.of('unusual_furniture:cat_plush', 1), // arg 1: output
		[
			' AC',
			'ABA', // arg 2: the shape (array of strings)
			'CA '
		],
		{
			A: 'minecraft:white_wool',  //arg 3: the mapping object
			B: 'unusual_furniture:screw',
			C: 'minecraft:orange_wool',
		}
	)


	event.remove({ output: 'unusual_furniture:tropical_plant' })
	event.remove({ output: 'unusual_furniture:mushroom_patch' })
	event.remove({ output: 'unusual_furniture:water_plants' })
	event.remove({ output: 'unusual_furniture:pebble_bag' })
	event.remove({ output: 'unusual_furniture:decorative_toolbox' })
	event.remove({ output: 'unusual_furniture:mystery_crate' })
})


