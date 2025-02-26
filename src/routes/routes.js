import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/home/home.jsx";
import Passenger from "../screens/passenger/passenger";

const Stack = createNativeStackNavigator();


function Routes() {
    return  <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false}} />
            <Stack.Screen name="Passenger" component={Passenger} options={{headerShown: false}} />
        </Stack.Navigator>

    </NavigationContainer>

}


export default Routes;