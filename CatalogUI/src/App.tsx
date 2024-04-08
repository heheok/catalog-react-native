import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { PESDK } from "react-native-photoeditorsdk";
import { Configuration, VESDK } from "react-native-videoeditorsdk";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ExampleListItem } from "./ExampleListItem";

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flexGrow: 1,
  };

  // highlight-theme
  const configuration: Configuration = {
    // Activate one of your themes.
    tools: [Tool.TEXT, Tool.TEXT_DESIGN, Tool.STICKER, Tool.FILTER],
    sticker: {
      categories: [
        {
          identifier: "imgly_sticker_category_giphy",
          provider: {
            apiKey: "QK8AGf8z9LXa382LFU7cineftTVtwboP",
          },
        },
      ],
    },
    trim: {
      maximumDuration: 15.0,
      forceMode: ForceTrimMode.IF_NEEDED,
    },
    export: {
      serialization: {
        enabled: true,
        exportType: SerializationExportType.FILE_URL,
      },
      video: {
        format: VideoFormat.MP4,
        codec: VideoCodec.HEVC,
        bitRate: COMPRESSOR_VIDEO_BITRATE,
        quality: 1,
      },
    },
  };

  async function openVideoEditor() {
    try {
      const result = await VESDK.openEditor(
        require("../assets/vesdk/Skater.mp4"),
        configuration
      );
      console.log(result?.video);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ ...backgroundStyle, marginTop: 15 }}
      >
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <ExampleListItem
            title="Open photo editor"
            description="Open the photo editor with user interface customizations."
            onPress={openPhotoEditor}
          ></ExampleListItem>
          <ExampleListItem
            title="Open video editor"
            description="Open the video editor with user interface customizations."
            onPress={openVideoEditor}
          ></ExampleListItem>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "IMG.LY for React Native" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
