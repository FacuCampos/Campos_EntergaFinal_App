import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator } from "../navigation";
import BottomTabNavigator from "./BottomTabNavigator";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSession } from "../persistence";
import { setUser } from "../features/User/UserSlice";
import Toast from "react-native-toast-message";
import { toastConfig } from "../global";
import { Platform } from "react-native";

const Navigator = () => {
  const { user } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS !== "web") {
          const response = await getSession();
          if (response.rows._array.length) {
            const user = response.rows._array[0];
            dispatch(
              setUser({
                localId: user.localId,
                email: user.email,
                idToken: user.token,
              })
            );
          }
        } else {
          console.log('Else')
          console.log(user)
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "¡Error!",
          text2: "Ha ocurrido un error inesperado",
          duration: 3000,
          position: "bottom",
        });
      }
    })();
  }, [user]);

  return (
    <>
      <NavigationContainer>
        {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default Navigator;
