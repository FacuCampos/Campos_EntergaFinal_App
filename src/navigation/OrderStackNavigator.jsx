import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Order from "../screens/Order";
import { colors } from "../global/colors";

const Stack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrderScreen"
      screenOptions={{ headerShown: false, contentStyle: styles.navigator }}
    >
      <Stack.Screen name="OrderScreen" component={Order} />
    </Stack.Navigator>
  );
};

export default OrderStackNavigator;

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: colors.fondo,
    flex: 1
  }
});
