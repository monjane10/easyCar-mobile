import { ActivityIndicator, Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from './passenger.style.js'
import { useState, useEffect } from "react";
import icons from '../../constants/icons.js'
import { getCurrentPositionAsync, requestForegroundPermissionsAsync, reverseGeocodeAsync } from "expo-location";



function Passenger(props) {

    const [myLocation, setMyLocation] = useState({});
    const [title, setTitle] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [dropoffAddress, setDropoffAddress] = useState("");


    async function RequestRideFromUser() {
        //Aceder aos dados do utilizador na API
        const response = {};
        return response;

        /*{
            ride_id: 2,
            passenger_user_id: 3,
            passenger_name: "Hayati Monjane",
            passenger_phone: "(+258) 850741012",
            pickup_address: "UEM-Campos, 123 - Centro",
            pickup_date: "2025-02-26",
            pickup_latitude: -25.929247,
            pickup_longitude: 32.585896,
            dropoff_address: "Shoprite",
            status: "P",
            driver_user_id: 4,
            driver_name: null,
            latitude: null,
            longitude: null
        } */
    }
    //Funcao para obter a localização do utilizador
    async function RequestPermissionAndGetLocation() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const location = await getCurrentPositionAsync();
            if (location.coords.latitude) {
                return location.coords;
            } else {
                return {};
            }
        } else {
            return {};
        }
    }

    async function RequestAdressName(latitude, longitude) {
        const response = await reverseGeocodeAsync({ latitude, longitude });
        if (response[0].street && response[0].streetNumber && response[0].district && response[0].city) {
            setPickupAddress(response[0].street + " " + response[0].streetNumber + ", " + response[0].district + ", " + response[0].city);
        }
    }

    async function LoadScreen() {
        //buscar dados de alguma corrida aberta na API para o utilizador...
        const response = await RequestRideFromUser();
        if (!response.ride_id) {
            const location = { latitude: -25.971289,longitude:  32.566223 };
           // const location = await RequestPermissionAndGetLocation();
            if (location.latitude) {
                setTitle("Solicitar uma corrida...");
                setMyLocation(location);
                RequestAdressName(location.latitude, location.longitude);
            } else {
                Alert.alert("Não foi possível obter a tua localização");
            }



        } else {
            //não tem corrida aberta

        }
    }


    useEffect(() => {
        LoadScreen();

    }, []);



    return (
        <View style={styles.container}>
            {myLocation.latitude ? <>
                <MapView style={styles.map}
                    provider={PROVIDER_DEFAULT}
                    initialRegion={{
                        latitude: myLocation.latitude,
                        longitude: myLocation.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04
                    }}>
                    <Marker coordinate={{
                        latitude: myLocation.latitude,
                        longitude: myLocation.longitude,
                    }}
                        title="Hayati Monjane"
                        description="FPLM, 4001"
                        image={icons.location} style={styles.marker} />

                </MapView>

                <View style={styles.footer}>

                    <View style={styles.footerText}>
                        <Text style={styles.title}>{title}</Text>
                    </View>

                    <View style={styles.footerFields}>
                        <Text>Origem</Text>
                        <TextInput style={styles.input} value={pickupAddress} />
                    </View>

                    <View style={styles.footerFields}>
                        <Text >Destino</Text>
                        <TextInput style={styles.input} value={dropoffAddress} />
                    </View>
                </View>

                <MyButton text="CONFIRMAR" theme="default" />
            </>
                :
                <View style={styles.loading}>
                    <ActivityIndicator size={"large"} />
                </View>
            }


        </View>
    );
}



export default Passenger;