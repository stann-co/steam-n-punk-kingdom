// Remove the Decorative Telescope in favour of Let's Do Furniture's working telescope.
// Both mods use the same spyglass-over-sticks recipe; without this one, it only makes furniture:telescope.
// Telescopes already placed in worlds drop furniture:telescope instead (kubejs/data/abyssal_decor/loot_table).
ServerEvents.recipes(event => {
	event.remove({ output: 'abyssal_decor:telescope_bottom' })
})
