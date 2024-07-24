import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ImageSelector, MyProfile} from "../screens";


const Stack = createNativeStackNavigator()

const MyProfileStackNavigator = () => {
    return (
        <Stack.Navigator
        initialRouteName="MyProfile"
        screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='MyProfile' component={MyProfile}/>
            <Stack.Screen name='ImageSelector' component={ImageSelector}/>
        </Stack.Navigator>
    )
}

export default MyProfileStackNavigator