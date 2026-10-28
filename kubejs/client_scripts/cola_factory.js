KubeJEIEvents.subtypes(event => {
	// Flat Soda is cut from the chain in server_scripts/cola_factory.js
	// (the Flat Soda fluids themselves can only be hidden through config/jei/blacklist.json)
	event.hide('create_cola_factory:flat_coca_cola_bucket')
	event.hide('create_cola_factory:flat_coca_cola_zero_bucket')
})
