import { NavigationContainer } from "@react-navigation/native";
/* import HomeStackNavigator from "./HomeStackNavigator"; */
import { AuthStackNavigator } from "../navigation";
import BottomTabNavigator from './BottomTabNavigator';
import { useSelector } from "react-redux";

const Navigator = () => {
  const { user } = useSelector((state) => state.auth.value)
  
  return (
    <NavigationContainer>
      {/*       <HomeStackNavigator /> */}
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
