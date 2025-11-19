UNITY_PATH ?= unity
PROJECT_PATH ?= $(CURDIR)
BUILD_OUTPUT ?= Build

.PHONY: start build-desktop build-webgl build-android clean

start:
@echo "Opening Unity project at $(PROJECT_PATH) with $(UNITY_PATH)"
$(UNITY_PATH) -projectPath "$(PROJECT_PATH)"

build-desktop:
@echo "Building desktop player to $(BUILD_OUTPUT)/Standalone/Player"
$(UNITY_PATH) -batchmode -nographics -quit \
-projectPath "$(PROJECT_PATH)" \
-buildTarget StandaloneWindows64 \
-executeMethod BuildScript.BuildStandalone \
-logFile - \
-buildOutput "$(BUILD_OUTPUT)/Standalone/Player"

build-webgl:
@echo "Building WebGL player to $(BUILD_OUTPUT)/WebGL"
$(UNITY_PATH) -batchmode -nographics -quit \
-projectPath "$(PROJECT_PATH)" \
-buildTarget WebGL \
-executeMethod BuildScript.BuildWebGL \
-logFile - \
-buildOutput "$(BUILD_OUTPUT)/WebGL"

build-android:
@echo "Building Android player to $(BUILD_OUTPUT)/Android"
$(UNITY_PATH) -batchmode -nographics -quit \
-projectPath "$(PROJECT_PATH)" \
-buildTarget Android \
-executeMethod BuildScript.BuildAndroid \
-logFile - \
-buildOutput "$(BUILD_OUTPUT)/Android"

clean:
rm -rf "$(BUILD_OUTPUT)"
