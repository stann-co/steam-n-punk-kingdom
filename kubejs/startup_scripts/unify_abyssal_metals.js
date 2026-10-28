// take the metals replaced in server_scripts/item_swaps.js out of creative and creative search
StartupEvents.modifyCreativeTab('abyssal_decor:abyssal_decor', event => {
	event.remove('abyssal_decor:seabrass_ingot')
	event.remove('abyssal_decor:seabrass_nugget')
	event.remove('abyssal_decor:deepbronze_ingot')
	event.remove('abyssal_decor:deepbronze_nugget')
	event.remove('abyssal_decor:moonsilver_ingot')
	event.remove('abyssal_decor:moonsilver_nugget')
	event.remove('abyssal_decor:bellmetal_ingot')
	event.remove('abyssal_decor:bellmetal_nugget')
	event.remove('abyssal_decor:raw_seabrass')
	event.remove('abyssal_decor:raw_seabrass_block')
	event.remove('abyssal_decor:seabrass_ore')
})
