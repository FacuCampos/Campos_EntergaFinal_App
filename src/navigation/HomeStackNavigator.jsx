import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ItemListCategory, ItemDetail } from "../screens";
import { colors } from "../global/colors";
import { Header } from "../components";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={ItemListCategory} name="ItemListCategory" />
      <Stack.Screen component={ItemDetail} name="ItemDetail" />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

/* 
,
        ({ route }) => ({
          statusBarColor: colors.primario,
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
        })
*/
