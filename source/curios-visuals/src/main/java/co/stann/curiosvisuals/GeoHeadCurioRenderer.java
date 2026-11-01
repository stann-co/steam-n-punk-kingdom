package co.stann.curiosvisuals;

import com.mojang.blaze3d.vertex.PoseStack;
import net.minecraft.client.model.EntityModel;
import net.minecraft.client.model.HumanoidModel;
import net.minecraft.client.renderer.MultiBufferSource;
import net.minecraft.client.renderer.entity.RenderLayerParent;
import net.minecraft.client.renderer.texture.OverlayTexture;
import net.minecraft.world.entity.EquipmentSlot;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.world.item.ItemStack;
import software.bernie.geckolib.animatable.client.GeoRenderProvider;
import software.bernie.geckolib.renderer.GeoArmorRenderer;
import software.bernie.geckolib.util.Color;
import top.theillusivec4.curios.api.SlotContext;
import top.theillusivec4.curios.api.client.ICurioRenderer;

/** Draws a hat that has a GeckoLib armor model, the same way Hybrid Aquatic draws its own. */
class GeoHeadCurioRenderer implements ICurioRenderer {
    @Override
    @SuppressWarnings({"unchecked", "rawtypes"})
    public <T extends LivingEntity, M extends EntityModel<T>> void render(ItemStack stack, SlotContext slotContext, PoseStack pose,
            RenderLayerParent<T, M> parent, MultiBufferSource buffer, int light, float limbSwing, float limbSwingAmount,
            float partialTicks, float ageInTicks, float netHeadYaw, float headPitch) {
        if (!(parent.getModel() instanceof HumanoidModel<?> humanoid)) {
            return;
        }
        HumanoidModel<LivingEntity> base = (HumanoidModel<LivingEntity>) humanoid;
        LivingEntity entity = slotContext.entity();
        HumanoidModel<?> armor = GeoRenderProvider.of(stack).getGeoArmorRenderer(entity, stack, EquipmentSlot.HEAD, base);
        if (armor instanceof GeoArmorRenderer<?> renderer) {
            renderer.prepForRender(entity, stack, EquipmentSlot.HEAD, base, buffer, partialTicks, limbSwing, limbSwingAmount, netHeadYaw, headPitch);
            ((HumanoidModel) base).copyPropertiesTo(renderer);
            renderer.renderToBuffer(pose, null, light, OverlayTexture.NO_OVERLAY, Color.WHITE.argbInt());
        }
    }
}
