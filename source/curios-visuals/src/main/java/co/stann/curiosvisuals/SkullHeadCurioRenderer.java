package co.stann.curiosvisuals;

import com.mojang.blaze3d.vertex.PoseStack;
import java.util.Map;
import net.minecraft.client.Minecraft;
import net.minecraft.client.model.EntityModel;
import net.minecraft.client.model.HeadedModel;
import net.minecraft.client.model.SkullModelBase;
import net.minecraft.client.renderer.MultiBufferSource;
import net.minecraft.client.renderer.RenderType;
import net.minecraft.client.renderer.blockentity.SkullBlockRenderer;
import net.minecraft.client.renderer.entity.RenderLayerParent;
import net.minecraft.core.component.DataComponents;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.block.AbstractSkullBlock;
import net.minecraft.world.level.block.SkullBlock;
import top.theillusivec4.curios.api.SlotContext;
import top.theillusivec4.curios.api.client.ICurioRenderer;

/** Draws a skull-type block on the head, following what the vanilla head layer does for the helmet slot. */
class SkullHeadCurioRenderer implements ICurioRenderer {
    // Hybrid Aquatic lifts plushies by this amount in the vanilla head layer so they sit on top of the head.
    private static final double PLUSHIE_LIFT = 0.421875;
    private static Map<SkullBlock.Type, SkullModelBase> models;

    @Override
    public <T extends LivingEntity, M extends EntityModel<T>> void render(ItemStack stack, SlotContext slotContext, PoseStack pose,
            RenderLayerParent<T, M> parent, MultiBufferSource buffer, int light, float limbSwing, float limbSwingAmount,
            float partialTicks, float ageInTicks, float netHeadYaw, float headPitch) {
        if (!(parent.getModel() instanceof HeadedModel headed)
                || !(stack.getItem() instanceof BlockItem blockItem)
                || !(blockItem.getBlock() instanceof AbstractSkullBlock skull)) {
            return;
        }
        if (models == null) {
            models = SkullBlockRenderer.createSkullRenderers(Minecraft.getInstance().getEntityModels());
        }
        SkullModelBase model = models.get(skull.getType());
        if (model == null) {
            return;
        }
        pose.pushPose();
        headed.getHead().translateAndRotate(pose);
        pose.scale(1.1875F, -1.1875F, -1.1875F);
        pose.translate(-0.5, 0.0, -0.5);
        pose.translate(0.0, PLUSHIE_LIFT, 0.0);
        RenderType renderType = SkullBlockRenderer.getRenderType(skull.getType(), stack.get(DataComponents.PROFILE));
        SkullBlockRenderer.renderSkull(null, 180.0F, limbSwing, pose, buffer, light, model, renderType);
        pose.popPose();
    }
}
