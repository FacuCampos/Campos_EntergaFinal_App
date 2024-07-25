import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ImageSelector, ListAddress, LocationSelector, MyProfile} from "../screens";


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
            <Stack.Screen name="ListAddress" component={ListAddress} />
            <Stack.Screen name="LocationSelector" component={LocationSelector} />
        </Stack.Navigator>
    )
}

export default MyProfileStackNavigator