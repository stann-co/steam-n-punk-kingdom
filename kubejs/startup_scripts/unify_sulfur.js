// take the sulfur replaced in server_scripts/item_swaps.js out of creative and creative search
StartupEvents.modifyCreativeTab('cgs:mod_items', event => {
	event.remove('cgs:sulfur')
})
