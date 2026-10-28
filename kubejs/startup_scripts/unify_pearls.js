// take the pearls replaced in server_scripts/item_swaps.js out of creative and creative search
StartupEvents.modifyCreativeTab('crittersandcompanions:main', event => {
	event.remove('crittersandcompanions:pearl')
})

// Hybrid Aquatic splits its pearls and pearl blocks across its items and blocks tabs
;['hybrid_aquatic:items', 'hybrid_aquatic:blocks'].forEach(tab => {
	StartupEvents.modifyCreativeTab(tab, event => {
		event.remove('hybrid_aquatic:pearl')
		event.remove('hybrid_aquatic:black_pearl')
		event.remove('hybrid_aquatic:pearl_block')
		event.remove('hybrid_aquatic:black_pearl_block')
	})
})
