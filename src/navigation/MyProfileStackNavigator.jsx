import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ImageSelector,
  ListAddress,
  LocationSelector,
  MyProfile,
} from "../screens";
import { StyleSheet } from "react-native";
import { colors } from "../global";

const Stack = createNativeStackNavigator();

const MyProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{
        headerShown: false,
        contentStyle: styles.navigator,
      }}
    >
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="ImageSelector" component={ImageSelector} />
      <Stack.Screen name="ListAddress" component={ListAddress} />
      <Stack.Screen name="LocationSelector" component={LocationSelector} />
    </Stack.Navigator>
  );
};

export default MyProfileStackNavigator;

const styles = StyleSheet.create({
    navigator: {
        flex: 1,
        backgroundColor: colors.fondo,
        alignItems: "center",
    }
  })