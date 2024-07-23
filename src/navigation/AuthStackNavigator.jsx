import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Login,Signup} from "../screens";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen component={Login} name='Login'/>
        <Stack.Screen component={Signup} name='Signup'/>
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
