// Disable all Create: Storage backpack upgrades.
// The blank upgrade is kept on purpose: the storage box upgrades are crafted from it.
ServerEvents.tags('item', event => {
	// the mod's own switch: tagged upgrades are rejected by the backpack's upgrade slot
	// and stop working if already installed
	event.add('fxntstorage:disabled_backpack_upgrades', '#fxntstorage:backpack_upgrade')
})

ServerEvents.recipes(event => {
	const upgrades = [
		'magnet', 'pickblock', 'itempickup', 'flight', 'refill', 'feeder', 'thirst', 'toolswap',
		'falldamage', 'oremining', 'torchdeployer', 'jukebox', 'health', 'crafting', 'workshop', 'void'
	]
	upgrades.forEach(upgrade => {
		event.remove({ output: `fxntstorage:backpack_${upgrade}_upgrade` })
	})
})
