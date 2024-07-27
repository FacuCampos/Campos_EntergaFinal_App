import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/Cart";
import { colors } from "../global/colors";

const Stack = createNativeStackNavigator();

const CartStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
      screenOptions={{ headerShown: false, contentStyle: styles.navigator }}
    >
      <Stack.Screen name="CartScreen" component={Cart} />
    </Stack.Navigator>
  );
};

export default CartStackNavigator;

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: colors.fondo,
    flex: 1
  }
})