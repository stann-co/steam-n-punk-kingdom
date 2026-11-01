// Aviator's Goggles only count as goggles in the helmet slot, so also accept them in a Curios slot
// isEquipped must get an Item: Rhino picks that overload even for a function, then crashes converting it
const GogglesItem = Java.loadClass('com.simibubi.create.content.equipment.goggles.GogglesItem')
const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')

// Don't return a Boolean out of an Optional: Rhino wraps it and can't convert that back for the Predicate
GogglesItem.addIsWearingPredicate(player => {
	const inventory = CuriosApi.getCuriosInventory(player).orElse(null)
	return inventory != null && inventory.isEquipped(Item.getItem('aeronautics:aviators_goggles'))
})
