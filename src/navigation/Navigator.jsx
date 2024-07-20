import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
/* import HomeStackNavigator from "./HomeStackNavigator"; */
import BottomTabNavigator from "./BottomTabNavigator";

const Navigator = () => {
  return (
    <NavigationContainer>
      {/*       <HomeStackNavigator /> */}
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
