KubeJEIEvents.subtypes(event => {
	// "Decorative Telescope" is two blocks; telescope_bottom is the craftable item, telescope_top the placed upper half
	// it is removed in server_scripts/ and startup_scripts/abyssal_decor.js, in favour of furniture:telescope
	event.hide('abyssal_decor:telescope_bottom')
	event.hide('abyssal_decor:telescope_top')
})
