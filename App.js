import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { useFonts } from "expo-font";

import Navigator from "./src/navigation/Navigator";

import { Provider } from "react-redux";
import store from "./src/store";

import { colors } from "./src/global/colors";

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
      <Provider store={store}>
        <Navigator />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
});
