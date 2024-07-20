import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeStackNavigator,
  CartStackNavigator,
  OrderStackNavigator,
} from "../navigation";
import { Header } from "../components";
import { colors } from "../global/colors";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from '@expo/vector-icons';
import { useEffect } from "react";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {

          return (
            <Header
              titulo={
                route.name 
              }
              route={route}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.primario,
          height: 60,
        },
      })}
    >
      <Tab.Screen
        name="Shop"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Entypo name="shop" size={24} color={focused ? colors.focusedIcon :colors.fondo} />
              </View>
            );
          }
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Entypo name="shopping-cart" size={24} color={focused ? colors.focusedIcon :colors.fondo} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome6 name="receipt" size={24} color={focused ? colors.focusedIcon :colors.fondo} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});

/* statusBarColor: colors.primario */
