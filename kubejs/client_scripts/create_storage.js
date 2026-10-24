KubeJEIEvents.subtypes(event => {
	// backpack upgrades are disabled in server_scripts/create_storage.js
	// (the tag also covers the "deactivated" variants, but not the blank upgrade)
	event.hide('#fxntstorage:backpack_upgrade')
})
