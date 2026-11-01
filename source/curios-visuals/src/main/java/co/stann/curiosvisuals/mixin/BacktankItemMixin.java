package co.stann.curiosvisuals.mixin;

import com.simibubi.create.content.equipment.armor.BacktankItem;
import net.minecraft.world.entity.Entity;
import net.minecraft.world.entity.LivingEntity;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;
import top.theillusivec4.curios.api.CuriosApi;

/**
 * Create's back model only checks the chest slot through this method. Jetpacks extend BacktankItem,
 * so checking Curios here draws both with their normal model and spinning cogs.
 */
@Mixin(value = BacktankItem.class, remap = false)
abstract class BacktankItemMixin {
    @Inject(method = "getWornBy", at = @At("RETURN"), cancellable = true)
    private static void curios_visuals$checkCurios(Entity entity, CallbackInfoReturnable<BacktankItem> cir) {
        if (cir.getReturnValue() != null || !(entity instanceof LivingEntity living)) {
            return;
        }
        CuriosApi.getCuriosInventory(living)
                .flatMap(inventory -> inventory.findFirstCurio(stack -> stack.getItem() instanceof BacktankItem))
                .filter(result -> result.slotContext().visible())
                .ifPresent(result -> cir.setReturnValue((BacktankItem) result.stack().getItem()));
    }
}
