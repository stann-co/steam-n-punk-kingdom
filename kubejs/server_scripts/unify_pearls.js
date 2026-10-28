// Abyssal Decor's pearls replace Hybrid Aquatic's and Critters and Companions' pearls,
// and Hybrid Aquatic's pearl blocks are swapped for Abyssal Decor's blocks of pearl.
const PEARL_REPLACEMENTS = {
	'hybrid_aquatic:pearl': 'abyssal_decor:white_pearl',
	'crittersandcompanions:pearl': 'abyssal_decor:white_pearl',
	'hybrid_aquatic:black_pearl': 'abyssal_decor:black_pearl',
	'hybrid_aquatic:pearl_block': 'abyssal_decor:block_of_pearl',
	'hybrid_aquatic:black_pearl_block': 'abyssal_decor:block_of_black_pearl'
}

ServerEvents.recipes(event => {
	Object.keys(PEARL_REPLACEMENTS).forEach(id => {
		// 1. Replace inputs
		event.replaceInput({}, id, PEARL_REPLACEMENTS[id])

		// 2. Remove recipes (only Hybrid Aquatic's pearl blocks and their decrafting make these)
		event.remove({ output: id })
	})
})

// clams, oysters and otters hand out pearls by spawning them as item entities, not through loot tables
EntityEvents.spawned('minecraft:item', event => {
	const stack = event.entity.getItem()
	const replacement = PEARL_REPLACEMENTS[stack.id]
	if (replacement) event.entity.setItem(Item.of(replacement, stack.count))
})

// anything that never touches the ground (wandering trader, chests, old stacks) is swapped
// once it lands in a player's inventory
PlayerEvents.inventoryChanged(event => {
	if (!PEARL_REPLACEMENTS[event.item.id]) return
	const inventory = event.player.inventory
	for (let i = 0; i < inventory.getContainerSize(); i++) {
		const stack = inventory.getItem(i)
		const replacement = PEARL_REPLACEMENTS[stack.id]
		if (replacement) inventory.setItem(i, Item.of(replacement, stack.count))
	}
})
