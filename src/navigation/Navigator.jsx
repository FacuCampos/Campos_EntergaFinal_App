import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator } from "../navigation";
import BottomTabNavigator from "./BottomTabNavigator";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSession } from "../persistence";
import { setUser } from "../features/User/UserSlice";

const Navigator = () => {
  const { user } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await getSession();
        if (response.rows._array.length) {
          const user = response.rows._array[0];
          console.log(user);
          dispatch(setUser({
            localId: user.localId,
            email: user.email,
            idToken: user.token
          }))
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
