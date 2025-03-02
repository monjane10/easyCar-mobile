import { ActivityIndicator, Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from './passenger.style.js'
import { useState, useEffect } from "react";
import icons from '../../constants/icons.js'
import { getCurrentPositionAsync, requestForegroundPermissionsAsync, reverseGeocodeAsync } from "expo-location";
import { api, HandleError } from "../../constants/api.js";


function Passenger(props) {

    const userId = 1; // UTILIZADOR LOGADO NA APLICAÇÃO
    const [myLocation, setMyLocation] = useState({});
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [rideId, setRideId] = useState(0);
    const [driverName, setDriverNAme] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [dropoffAddress, setDropoffAddress] = useState("");


    async function RequestRideFromUser() {
        //Aceder aos dados do utilizador na API
        try {
            const response = await api.get("/rides", {
                params: {
                    passenger_user_id: userId,
                    pickup_date: new Date().toISOString("pt-MZ", {
                        timeZone: "Africa/Maputo"
                    }).substring(0, 10),
                    status_not: "F"
                }
            });
            if (response.data[0])
                return response.data[0];
            else
                return {};

        } catch (error) {
            HandleError(error);
            props.navigation.goBack();
        }
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
            const location = { latitude: -25.971289, longitude: 32.566223 };
            // const location = await RequestPermissionAndGetLocation();
            if (location.latitude) {
                setTitle("Solicitar uma corrida...");
                setMyLocation(location);
                RequestAdressName(location.latitude, location.longitude);
            } else {
                Alert.alert("Não foi possível obter a tua localização");
            }
        } else {
            setTitle(response.status == "P" ? "Esperar pelo motorista!" : "O teu motorista está a caminho!");
            setMyLocation({ latitude: response.pickup_latitude, longitude: response.pickup_longitude });
            setPickupAddress(response.pickup_address);
            setDropoffAddress(response.dropoff_address);
            setStatus(response.status);
            setRideId(response.ride_id);
            setDriverNAme(response.driver_name + " - " + response.driver_phone);
        }
    }

    //Função para solicitar uma corrida
    async function AskForRide() {
        try {
            const json = {
                passenger_user_id: userId,
                pickup_address: pickupAddress,
                dropoff_address: dropoffAddress,
                pickup_latitude: myLocation.latitude,
                pickup_longitude: myLocation.longitude,
            }
            const response = await api.post("/rides", json);
            if (response.data)
                props.navigation.goBack();
        } catch (error) {
            HandleError(error);
        }
    }

    //Função para cancelar uma corrida
    async function CancelRide() {
        const json = {
            passenger_user_id: userId,
            ride_id: rideId,
        }

        console.log("Dados a serem enviados para a API: ", json);

        props.navigation.goBack(); //Voltar para a tela anterior
    }
    //Função para finalizar uma corrida
    async function FinishRide() {
        const json = {
            passenger_user_id: userId,
            ride_id: rideId,
        }

        console.log("Dados a serem enviados para a API: ", json);

        props.navigation.goBack(); //Voltar para a tela anterior
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
                        latitude: Number(myLocation.latitude),
                        longitude: Number(myLocation.longitude),
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04
                    }}>
                    <Marker coordinate={{
                        latitude: Number(myLocation.latitude),
                        longitude: Number(myLocation.longitude),
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
                        <TextInput style={styles.input} value={pickupAddress}
                            onChangeText={(text) => setPickupAddress(text)}
                            editable={status == "" ? true : false} />
                    </View>

                    <View style={styles.footerFields}>
                        <Text >Destino</Text>
                        <TextInput style={styles.input} value={dropoffAddress}
                            onChangeText={(text) => setDropoffAddress(text)}
                            editable={status == "" ? true : false} />
                    </View>

                    {
                        status == "A" && <View style={styles.footerFields}>
                            <Text >Motorista</Text>
                            <TextInput style={styles.input} value={driverName}
                                editable={false} />
                        </View>
                    }


                </View>
                {status === "" && <MyButton text="CONFIRMAR" theme="default" onClick={AskForRide} />}
                {status === "P" && <MyButton text="CANCELAR" theme="red" onClick={CancelRide} />}
                {status === "A" && <MyButton text="FINALIZAR CORRIDA" theme="red" onClick={FinishRide} />}

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