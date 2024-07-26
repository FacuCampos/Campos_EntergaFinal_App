import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ItemListCategory, ItemDetail } from "../screens";

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