// Create Deco's Industrial Iron is made from Gunsmithing's Steel: its ingot, nugget and sheet are swapped
// for steel in item_swaps.js, and the blocks are renamed "Industrial Steel" in kubejs/assets/*/lang.
ServerEvents.tags('item', event => {
	// about a dozen Create Deco recipes ask for these tags rather than the items
	event.removeAll('c:ingots/industrial_iron')
	event.removeAll('c:nuggets/industrial_iron')
	event.removeAll('c:plates/industrial_iron')
	event.add('c:ingots/industrial_iron', 'cgs:steel_ingot')
	event.add('c:nuggets/industrial_iron', 'cgs:steel_nugget')
	event.add('c:plates/industrial_iron', 'cgs:steel_sheet')
})

ServerEvents.recipes(event => {
	// steel sits at brass's heat tier, so Industrial Steel isn't locked behind blaze cakes
	event.remove({ id: 'cgs:mixing/steel_ingot' })
	event.custom({
		type: 'create:mixing',
		heat_requirement: 'heated',
		ingredients: [{ tag: 'c:ingots/iron' }, { item: 'cgs:charcoal_dust' }],
		results: [{ id: 'cgs:steel_ingot' }]
	})

	// Block of Industrial Steel is stonecut from steel at Create's old iron rate (1 ingot -> 2 blocks) and
	// doesn't craft back into ingots; Create Deco's 9-ingot recipe would duplicate Gunsmithing's Block of Steel
	event.remove({ id: 'create:industrial_iron_block_from_ingots_iron_stonecutting' })
	event.remove({ id: 'createdeco:industrial_iron_block' })
	event.stonecutting(Item.of('create:industrial_iron_block', 2), 'cgs:steel_ingot')

	// Create recipes that the swap in item_swaps.js can't rewrite (there's no KubeJS Create addon)
	event.remove({ id: 'createdeco:pressing/industrial_iron_sheet' })
	event.remove({ id: 'createdeco:pressing/coins/industrial_iron_coin' })
	event.custom({
		type: 'create:pressing',
		ingredients: [{ item: 'cgs:steel_nugget' }],
		results: [{ id: 'createdeco:industrial_iron_coin' }]
	})
})
