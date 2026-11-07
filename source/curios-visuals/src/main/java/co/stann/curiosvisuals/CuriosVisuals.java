package co.stann.curiosvisuals;

import java.util.List;
import java.util.function.Supplier;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.resources.ResourceLocation;
import net.neoforged.api.distmarker.Dist;
import net.neoforged.bus.api.IEventBus;
import net.neoforged.fml.common.Mod;
import net.neoforged.fml.event.lifecycle.FMLClientSetupEvent;
import top.theillusivec4.curios.api.client.CuriosRendererRegistry;
import top.theillusivec4.curios.api.client.ICurioRenderer;

@Mod(value = "curios_visuals", dist = Dist.CLIENT)
public class CuriosVisuals {
    private static final List<String> PLUSHIES = List.of(
            "basking_shark", "bull_shark", "frilled_shark", "great_white_shark",
            "hammerhead_shark", "thresher_shark", "tiger_shark", "whale_shark");

    public CuriosVisuals(IEventBus modBus) {
        modBus.addListener(CuriosVisuals::clientSetup);
    }

    private static void clientSetup(FMLClientSetupEvent event) {
        event.enqueueWork(() -> {
            register("crittersandcompanions:acorn_hat", GeoHeadCurioRenderer::new);
            register("aeronautics:aviators_goggles", () -> new ArmorHeadCurioRenderer(
                    ResourceLocation.parse("aeronautics:textures/models/armor/aviators_goggles_layer_1.png")));
            PLUSHIES.forEach(name -> register("hybrid_aquatic:" + name + "_plushie", SkullHeadCurioRenderer::new));
            HiddenKeybinds.apply();
        });
    }

    private static void register(String id, Supplier<ICurioRenderer> renderer) {
        BuiltInRegistries.ITEM.getOptional(ResourceLocation.parse(id))
                .ifPresent(item -> CuriosRendererRegistry.register(item, renderer));
    }
}
