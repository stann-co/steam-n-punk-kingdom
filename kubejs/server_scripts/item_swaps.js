// Items removed from the pack, mapped to what replaces them. Recipes take the replacement instead and stop
// making the removed item, and stacks that still turn up (old worlds, drops, trades, chests) are swapped.
// The removed items are hidden in client_scripts/ and taken out of creative in startup_scripts/.
const ITEM_SWAPS = {
	// Abyssal Decor's pearls replace Hybrid Aquatic's and Critters and Companions' (unify_pearls.js)
	'hybrid_aquatic:pearl': 'abyssal_decor:white_pearl',
	'crittersandcompanions:pearl': 'abyssal_decor:white_pearl',
	'hybrid_aquatic:black_pearl': 'abyssal_decor:black_pearl',
	'hybrid_aquatic:pearl_block': 'abyssal_decor:block_of_pearl',
	'hybrid_aquatic:black_pearl_block': 'abyssal_decor:block_of_black_pearl',

	// Abyssal Decor's metal decor is made from Create and vanilla metals (unify_abyssal_metals.js)
	'abyssal_decor:seabrass_ingot': 'create:brass_ingot',
	'abyssal_decor:seabrass_nugget': 'create:brass_nugget',
	'abyssal_decor:deepbronze_ingot': 'minecraft:copper_ingot',
	'abyssal_decor:deepbronze_nugget': 'create:copper_nugget',
	'abyssal_decor:moonsilver_ingot': 'minecraft:iron_ingot',
	'abyssal_decor:moonsilver_nugget': 'minecraft:iron_nugget',
	'abyssal_decor:bellmetal_ingot': 'create:zinc_ingot',
	'abyssal_decor:bellmetal_nugget': 'create:zinc_nugget',
	'abyssal_decor:raw_seabrass': 'create:raw_zinc',
	'abyssal_decor:raw_seabrass_block': 'create:raw_zinc_block',
	'abyssal_decor:seabrass_ore': 'create:zinc_ore',

	// Cola Factory's Flat Soda stage is gone (cola_factory.js)
	'create_cola_factory:flat_coca_cola_bucket': 'create_cola_factory:coca_cola_syrup_bucket',
	'create_cola_factory:flat_coca_cola_zero_bucket': 'create_cola_factory:coca_cola_syrup_zero_bucket'
}

ServerEvents.recipes(event => {
	Object.keys(ITEM_SWAPS).forEach(id => {
		// 1. Replace inputs
		event.replaceInput({}, id, ITEM_SWAPS[id])

		// 2. Remove recipes that make the removed item
		event.remove({ output: id })
	})
})

// clams, oysters, otters, mined ores and broken blocks all drop as item entities
EntityEvents.spawned('minecraft:item', event => {
	const stack = event.entity.getItem()
	const replacement = ITEM_SWAPS[stack.id]
	if (replacement) event.entity.setItem(Item.of(replacement, stack.count))
})

// anything that never touches the ground (/give, wandering trader, chests, old stacks) is swapped in
// players' inventories, checked once a second. This runs on the player tick rather than in
// PlayerEvents.inventoryChanged: editing slots from inside that event duplicated the replacement.
PlayerEvents.tick(event => {
	const player = event.player
	if (player.tickCount % 20 != 0) return
	const inventory = player.inventory
	for (let i = 0; i < inventory.slots; i++) {
		const stack = inventory.getStackInSlot(i)
		const replacement = ITEM_SWAPS[stack.id]
		if (replacement) inventory.setStackInSlot(i, Item.of(replacement, stack.count))
	}
})
