import { SafeAreaView, StyleSheet } from "react-native";

import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { colors } from "./src/global/colors";
import { Header } from "./src/components";
import { HomeScreen, ItemDetail, ItemListCategory } from "./src/screens";

const Stack = createNativeStackNavigator();

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
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={ ({route}) => ({
            header: () => {
              return (
                <Header
                  titulo={
                    route.name === "Home"
                      ? "Categorias"
                      : route.name === "ItemListCategory"
                      ? route.params.categoriaElegida
                      : "Detalle"
                  }
                />
              );
            },
            statusBarColor: colors.primario,
          })}
        >
          <Stack.Screen component={HomeScreen} name="Home" />
          <Stack.Screen component={ItemListCategory} name="ItemListCategory" />
          <Stack.Screen component={ItemDetail} name="ItemDetail" />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primario,
  },
});

/* {
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: colors.primario,
            },
            headerTintColor: colors.fondo,
            headerTitleStyle: {
              fontFamily: "OswaldBold",
              fontSize: 28,
            },
            contentStyle: {
              backgroundColor: colors.fondo
            }
          } */
