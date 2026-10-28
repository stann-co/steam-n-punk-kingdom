// Abyssal Decor's Seabrass, Deepbronze, Moonsilver and Bellmetal are swapped for brass, copper, iron and zinc
// in item_swaps.js. These decor recipes would then clash with existing ones (iron bars, Create Deco's bars and
// trapdoors, Abyssal Decor's own iron sconce), so they move to the stonecutter.
ServerEvents.recipes(event => {
	// bars: 6 ingots -> 16 bars becomes 1 ingot -> 3 bars
	const bars = {
		'abyssal_decor:seabrass_bars_recipe': ['create:brass_ingot', 'abyssal_decor:seabrass_bars'],
		'abyssal_decor:bronze_bars_recipe': ['minecraft:copper_ingot', 'abyssal_decor:deepbronze_bars'],
		'abyssal_decor:moonsilver_bars_recipe': ['minecraft:iron_ingot', 'abyssal_decor:moonsilver_bars_solo'],
		'abyssal_decor:bellmetal_bars_recipe': ['create:zinc_ingot', 'abyssal_decor:bellmetal_bars_solo']
	}
	Object.keys(bars).forEach(id => {
		event.remove({ id: id })
		event.stonecutting(Item.of(bars[id][1], 3), bars[id][0])
	})

	// metal blocks: 4 ingots -> 1 block becomes 1 storage block (9 ingots) -> 2 blocks
	// (Block of Seabrass had two identical recipes)
	const blockRecipes = [
		'abyssal_decor:brass_block_recipe',
		'abyssal_decor:seabrass_ore_block_recipe',
		'abyssal_decor:moonsilver_block_recipe',
		'abyssal_decor:bellmetal_block_recipe'
	]
	blockRecipes.forEach(id => event.remove({ id: id }))
	event.stonecutting(Item.of('abyssal_decor:seabrass_block', 2), 'create:brass_block')
	event.stonecutting(Item.of('abyssal_decor:moonsilver_block', 2), 'minecraft:iron_block')
	event.stonecutting(Item.of('abyssal_decor:bellmetal_block', 2), 'create:zinc_block')

	// moonsilver was iron + glowstone, and its sconce would now be the iron sconce's exact recipe
	event.remove({ id: 'abyssal_decor:moonsilver_sconce_recipe' })
	event.shapeless('abyssal_decor:moonsilver_sconce', ['abyssal_decor:iron_sconce', 'minecraft:glowstone_dust'])
})
