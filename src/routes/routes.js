import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/home/home.jsx";
import Passenger from "../screens/passenger/passenger";
import Ride from "../screens/ride/ride.jsx";

const Stack = createNativeStackNavigator();


function Routes() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Passenger" component={Passenger} options={{
                headerShadowVisible: false,
                headerTitle: "",
                headerTransparent: true,
            }} />

            <Stack.Screen name="Ride" component={Ride} options={{
                headerTitle: "Viagens Disponíveis",
                headerTitleAlign: "center"
              
            }} />
        </Stack.Navigator>

    </NavigationContainer>

}


export default Routes;