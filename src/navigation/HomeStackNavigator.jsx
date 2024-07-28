import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ItemListCategory, ItemDetail } from "../screens";
import { StyleSheet } from "react-native";
import { colors } from "../global";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, contentStyle: styles.navigator }}
    >
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={ItemListCategory} name="ItemListCategory" />
      <Stack.Screen component={ItemDetail} name="ItemDetail" />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: colors.fondo,
    flex: 1
  }
})