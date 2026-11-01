#!/usr/bin/env bash
# Builds mods/seasonal-mod-loader-1.0.0.jar. Needs JDK 21 or newer; set JDK to its folder
# if it isn't on PATH. Run packwiz refresh afterwards so the index picks up the new jar.
set -euo pipefail
cd "$(dirname "$0")"

bin="${JDK:+$JDK/bin/}"
work=build
rm -rf "$work"
mkdir -p "$work/classes"
trap 'rm -rf "$work"' EXIT

curl -sSfL -o "$work/loader.jar" https://maven.neoforged.net/releases/net/neoforged/fancymodloader/loader/4.0.45/loader-4.0.45.jar
curl -sSfL -o "$work/slf4j.jar" https://repo1.maven.org/maven2/org/slf4j/slf4j-api/2.0.13/slf4j-api-2.0.13.jar

# Relative wildcard classpath, so this works unchanged on Windows and Linux.
"${bin}javac" --release 21 -nowarn -proc:none -cp "$work/*" -d "$work/classes" \
  src/co/stann/seasonal/SeasonalModLocator.java
cp -r resources/META-INF "$work/classes/"
"${bin}jar" --create --file ../../mods/seasonal-mod-loader-1.0.0.jar -C "$work/classes" .
