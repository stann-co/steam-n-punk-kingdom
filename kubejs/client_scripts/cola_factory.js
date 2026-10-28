// Flat Soda is cut from the chain in server_scripts/cola_factory.js
KubeJEIEvents.subtypes(event => {
	event.hide('create_cola_factory:flat_coca_cola_bucket')
	event.hide('create_cola_factory:flat_coca_cola_zero_bucket')
})

// the KubeJS JEI addon only hides items, so the fluids go through KubeJS's own recipe viewer events
RecipeViewerEvents.removeEntries('fluid', event => {
	event.remove('create_cola_factory:flat_coca_cola')
	event.remove('create_cola_factory:flat_coca_cola_zero')
})
