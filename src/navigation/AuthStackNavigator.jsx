import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Login,Signup} from "../screens";
import { colors } from "../global/colors";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        contentStyle: styles.navigator,
        headerShown: false,
      }}
    >
        <Stack.Screen component={Login} name='Login'/>
        <Stack.Screen component={Signup} name='Signup'/>
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: colors.fondo,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})