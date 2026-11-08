// Create Gunsmithing's sulfur is swapped for Hybrid Aquatic's in item_swaps.js, which also points the
// gunpowder recipe at it. Its sulfur ore now drops Hybrid Aquatic's sulfur (data/cgs/loot_table) and so does
// crushing magma blocks (data/create/recipe/crushing/magma_block.json).
ServerEvents.tags('item', event => {
	event.remove('c:dusts/sulfur', 'cgs:sulfur')
	event.remove('c:dusts', 'cgs:sulfur')
	event.add('c:dusts/sulfur', 'hybrid_aquatic:sulfur')
	event.add('c:dusts', 'hybrid_aquatic:sulfur')
})
