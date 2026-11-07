package co.stann.curiosvisuals;

import com.mojang.blaze3d.platform.InputConstants;
import com.mojang.logging.LogUtils;
import java.util.Arrays;
import java.util.Set;
import net.minecraft.client.KeyMapping;
import net.minecraft.client.Minecraft;
import net.minecraft.client.Options;
import org.slf4j.Logger;

/**
 * Removes key binds for features the pack disables, so they don't show up in Controls.
 * Create: Storage's jetpack and ore-mining keys belong to backpack upgrades that
 * kubejs/server_scripts/create_storage.js disables, and look like Create Jetpack's own keys.
 */
final class HiddenKeybinds {
    private static final Logger LOGGER = LogUtils.getLogger();

    private static final Set<String> HIDDEN = Set.of(
            "hotKey.fxntstorage.toggle_jetpack",
            "hotKey.fxntstorage.toggle_jetpack_hover",
            "hotKey.fxntstorage.oremine_any_block");

    private HiddenKeybinds() {}

    static void apply() {
        Options options = Minecraft.getInstance().options;
        int before = options.keyMappings.length;
        options.keyMappings = Arrays.stream(options.keyMappings)
                .filter(key -> {
                    if (!HIDDEN.contains(key.getName())) return true;
                    // unbind first so a hidden key can never fire or show up as a conflict
                    key.setKey(InputConstants.UNKNOWN);
                    return false;
                })
                .toArray(KeyMapping[]::new);
        KeyMapping.resetMapping();
        LOGGER.info("Hid {} key binds for disabled features", before - options.keyMappings.length);
    }
}
