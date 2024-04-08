import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Configuration,
  VESDK,
  Tool,
  ForceTrimMode,
  SerializationExportType,
  VideoFormat,
  VideoCodec,
} from 'react-native-videoeditorsdk';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ExampleListItem} from './ExampleListItem';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flexGrow: 1,
  };

  const configuration: Configuration = {
    tools: [Tool.TEXT, Tool.TEXT_DESIGN, Tool.FILTER],
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
        bitRate: 8000,
        quality: 1,
      },
    },
  };
  async function openAndroidVideo() {
    try {
      const result = await VESDK.openEditor(
        require('../src/preparedVideos/fromAndroid/original.mp4'),
        configuration,
        require('../src/preparedVideos/fromAndroid/serialization.json'),
      );
      console.log(result?.video);
    } catch (error) {
      console.log(error);
    }
  }
  async function openIosVideo() {
    try {
      const result = await VESDK.openEditor(
        require('../src/preparedVideos/fromIos/original.mp4'),
        configuration,
        require('../src/preparedVideos/fromIos/serialization.json'),
      );
      console.log(result?.video);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{...backgroundStyle, marginTop: 15}}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <ExampleListItem
            title="Video Prepared on Android"
            description="This video is serialized in Andorid, using VESDK"
            onPress={openAndroidVideo}
          />
          <ExampleListItem
            title="Video Prepared on IOS"
            description="This video is serialized in iOS, using VESDK"
            onPress={openIosVideo}
          />
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
          options={{title: 'IMG.LY for React Native'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
