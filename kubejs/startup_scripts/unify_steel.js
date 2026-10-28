// take the Industrial Iron items replaced in server_scripts/item_swaps.js out of creative and creative search
;['createdeco:props_tab', 'createdeco:bricks_tab'].forEach(tab => {
	StartupEvents.modifyCreativeTab(tab, event => {
		event.remove('createdeco:industrial_iron_ingot')
		event.remove('createdeco:industrial_iron_nugget')
		event.remove('createdeco:industrial_iron_sheet')
		event.remove('createdeco:industrial_iron_window')
		event.remove('createdeco:industrial_iron_window_pane')
	})
})
