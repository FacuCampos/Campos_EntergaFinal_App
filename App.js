import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { useFonts } from "expo-font";

import { colors } from "./src/global/colors";

import Navigator from "./src/navigation/Navigator";

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    OswaldLight: require("./assets/fonts/Oswald/Oswald-Light.ttf"),
    OswaldMedium: require("./assets/fonts/Oswald/Oswald-Medium.ttf"),
    OswaldBold: require("./assets/fonts/Oswald/Oswald-Bold.ttf"),
    PlayfairDisplayRegular: require("./assets/fonts/PlayFair_Display/PlayfairDisplay-Regular.ttf"),
    PlayfairDisplayBold: require("./assets/fonts/PlayFair_Display/PlayfairDisplay-Bold.ttf"),
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  }
  return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <Navigator />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
});
