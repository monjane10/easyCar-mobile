import { Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from './ride-details.style.js';
import { useEffect, useState } from "react";
import icons from '../../constants/icons.js';



function RideDetails(props) {

    const rideId = props.route.params.rideId;
    const userId = props.route.params.userId;
    const [title, setTitle] = useState('');
    const [ride, setRide] = useState({});
    console.log(rideId, userId);

    async function RequestRideDetails() {
        //Aceder a dados da viagem na API
        const response = {
            ride_id: 2,
            passenger_user_id: 3,
            passenger_name: "Hayati Monjane",
            passenger_phone: "(+258) 850741012",
            pickup_address: "UEM-Campos, 123 - Julius Nyerere",
            pickup_date: "2025-02-26",
            pickup_latitude: -25.980528, 
            pickup_longitude: 32.591983,
            dropoff_address: "Shoprite Da Matola",
            status: "P",
            driver_user_id: 4,
            driver_name: null,
        }

        if (response.passenger_name) {
            setTitle(response.passenger_name + " - " + response.passenger_phone);
            setRide(response);
        }
    }

    async function AcceptRide() {
        //Aceder a dados da viagem na API
        const json = {
            driver_user_id: userId,
            ride_id: rideId,
        }
        console.log("Aceitar Corrida:", json);
        props.navigation.goBack();
    }

    async function CancelRide() {
        //Aceder a dados da viagem na API
        const json = {
            driver_user_id: userId,
            ride_id: rideId,
        }
        console.log("Cancelar Corrida:", json);
        props.navigation.goBack();
    }

    useEffect(() => {
        RequestRideDetails();
    }, [])



    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                provider={PROVIDER_DEFAULT}
                initialRegion={{
                    latitude: ride.pickup_latitude,
                    longitude: ride.pickup_longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                }}>
                <Marker coordinate={{
                     latitude: ride.pickup_latitude,
                     longitude: ride.pickup_longitude
                }}
                    title={ride.passenger_name}
                    description={ride.pickup_address}
                    image={icons.location} style={styles.marker} />

            </MapView>

            <View style={styles.footer}>

            <View style={styles.footerText}>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.footerFields}>
                    <Text>Origem</Text>
                    <TextInput style={styles.input} value={ride.pickup_address}
                    editable={false} />
                </View>

                <View style={styles.footerFields}>
                    <Text >Destino</Text>
                    <TextInput style={styles.input} value={ride.dropoff_address}
                    editable={false} />
                </View>
            </View>

            {
                    ride.status == "P" &&   <MyButton text="ACEITAR" theme="default"
                    onClick={AcceptRide} />
                }
                 {
                   ride.status == "A" &&   <MyButton text="CANCELAR" theme="red"
                    onClick={CancelRide} />
                }

        </View>
    );
}


export default RideDetails;