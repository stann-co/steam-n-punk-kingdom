// take the Decorative Telescope out of the creative tab and creative search
StartupEvents.modifyCreativeTab('abyssal_decor:abyssal_decor', event => {
	event.remove('abyssal_decor:telescope_bottom')
})
