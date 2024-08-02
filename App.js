import { Platform, SafeAreaView, StyleSheet } from "react-native";

import { useFonts } from "expo-font";

import Navigator from "./src/navigation/Navigator";

import { Provider } from "react-redux";
import store from "./src/store";

import { MyStatusBar } from "./src/components";

import { initSQLiteDB } from "./src/persistence";
import { colors, toastConfig } from "./src/global";
import Toast from "react-native-toast-message";

(async () => {
  try {
    if (Platform.OS !== "web") {
      const response = await initSQLiteDB();
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "¡Error!",
      text2: "Ha ocurrido un error al iniciar la app",
      duration: 3000,
      position: "bottom",
    });
  }
})();

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    TituloFont: require("./assets/fonts/Oswald/Oswald-Regular.ttf"),
    TituloFontLight: require("./assets/fonts/Oswald/Oswald-Light.ttf"),
    TituloFontBold: require("./assets/fonts/Oswald/Oswald-Bold.ttf"),
    SecundariaFont: require("./assets/fonts/PlayFair_Display/PlayfairDisplay-Regular.ttf"),
    SecundariaFontItalic: require("./assets/fonts/PlayFair_Display/PlayfairDisplay-Italic.ttf"),
    SecundariaFontBold: require("./assets/fonts/PlayFair_Display/PlayfairDisplay-Bold.ttf"),
    InputFont: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    InputFontItalic: require("./assets/fonts/Poppins/Poppins-Italic.ttf"),
    InputFontLigth: require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    InputFontBold: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <MyStatusBar />
        <Navigator />
      </Provider>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
});
