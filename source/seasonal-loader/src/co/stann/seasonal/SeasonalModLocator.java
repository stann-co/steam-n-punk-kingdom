package co.stann.seasonal;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;
import net.neoforged.fml.loading.FMLPaths;
import net.neoforged.neoforgespi.ILaunchContext;
import net.neoforged.neoforgespi.locating.IDiscoveryPipeline;
import net.neoforged.neoforgespi.locating.IModFileCandidateLocator;
import net.neoforged.neoforgespi.locating.IncompatibleFileReporting;
import net.neoforged.neoforgespi.locating.ModFileDiscoveryAttributes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Loads the jars in seasonal/name_MM-DD_MM-DD/ when today is between those two days, inclusive.
 * The window can cross New Year. Start the game with -Dseasonal.date=MM-DD to preview another day.
 */
public class SeasonalModLocator implements IModFileCandidateLocator {
    private static final Logger LOGGER = LoggerFactory.getLogger("SeasonalMods");
    private static final Pattern WINDOW = Pattern.compile(".*_([0-9]{2}-[0-9]{2})_([0-9]{2}-[0-9]{2})");

    @Override
    public void findCandidates(ILaunchContext context, IDiscoveryPipeline pipeline) {
        Path root = FMLPaths.GAMEDIR.get().resolve("seasonal");
        if (!Files.isDirectory(root)) {
            return;
        }
        String today = System.getProperty("seasonal.date", DateTimeFormatter.ofPattern("MM-dd").format(LocalDate.now()));
        for (Path folder : list(root)) {
            Matcher window = WINDOW.matcher(folder.getFileName().toString());
            if (!Files.isDirectory(folder) || !window.matches()) {
                continue;
            }
            boolean active = inWindow(today, window.group(1), window.group(2));
            LOGGER.info("{} is {} on {}", folder.getFileName(), active ? "on" : "off", today);
            if (active) {
                for (Path file : list(folder)) {
                    if (file.getFileName().toString().endsWith(".jar")) {
                        pipeline.addPath(file, ModFileDiscoveryAttributes.DEFAULT, IncompatibleFileReporting.WARN_ALWAYS);
                    }
                }
            }
        }
    }

    static boolean inWindow(String day, String first, String last) {
        if (first.compareTo(last) <= 0) {
            return day.compareTo(first) >= 0 && day.compareTo(last) <= 0;
        }
        return day.compareTo(first) >= 0 || day.compareTo(last) <= 0;
    }

    // A seasonal folder that can't be read shouldn't stop the game from starting.
    private static List<Path> list(Path folder) {
        try (Stream<Path> files = Files.list(folder)) {
            return files.sorted().toList();
        } catch (IOException e) {
            LOGGER.error("Could not read {}", folder, e);
            return List.of();
        }
    }

    @Override
    public String toString() {
        return "{seasonal mods locator}";
    }
}
