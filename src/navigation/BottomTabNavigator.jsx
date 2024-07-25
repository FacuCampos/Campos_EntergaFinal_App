import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeStackNavigator,
  CartStackNavigator,
  OrderStackNavigator,
} from "../navigation";
import { Header } from "../components";
import { colors } from "../global/colors";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import MyProfileStackNavigator from "./MyProfileStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header titulo={route.name} route={route} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.primario,
          height: 70,
          padding: 5
/*           borderRadius: 10,
          marginHorizontal: 10,
          marginBottom: 10 */
        },
      })}
    >
      <Tab.Screen
        name="Tienda"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Entypo
                  name="shop"
                  size={28}
                  color={focused ? colors.focusedIcon : colors.textoClaro}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Entypo
                  name="shopping-cart"
                  size={28}
                  color={focused ? colors.focusedIcon : colors.textoClaro}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Orden"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome6
                  name="receipt"
                  size={28}
                  color={focused ? colors.focusedIcon : colors.textoClaro}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={MyProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome6
                  name="user-large"
                  size={28}
                  color={focused ? colors.focusedIcon : colors.textoClaro}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
