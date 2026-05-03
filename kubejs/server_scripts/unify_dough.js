ServerEvents.recipes(event => {
	// 1. Replace inputs
	event.replaceInput(
			{},
			'farmersdelight:wheat_dough',
			'create:dough' 
	)
	
	// 2. Replace outputs
	event.replaceOutput( 
			{}, 
			'farmersdelight:wheat_dough',
			'create:dough' 
	) 
	
	// 3. Remove recipes 
	event.remove(	{ mod: 'farmersdelight', output: 'minecraft:bread' } )
})

