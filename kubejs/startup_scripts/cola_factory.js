// take the Flat Soda buckets out of creative and creative search (see server_scripts/cola_factory.js)
StartupEvents.modifyCreativeTab('create_cola_factory:cola_factory', event => {
	event.remove('create_cola_factory:flat_coca_cola_bucket')
	event.remove('create_cola_factory:flat_coca_cola_zero_bucket')
})
