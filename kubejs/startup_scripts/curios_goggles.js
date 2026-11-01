// Aviator's Goggles only count as goggles in the helmet slot, so also accept them in a Curios slot
const GogglesItem = Java.loadClass('com.simibubi.create.content.equipment.goggles.GogglesItem')
const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')

GogglesItem.addIsWearingPredicate(player =>
	CuriosApi.getCuriosInventory(player)
		.map(inventory => inventory.isEquipped(stack => stack.id == 'aeronautics:aviators_goggles'))
		.orElse(false)
)
