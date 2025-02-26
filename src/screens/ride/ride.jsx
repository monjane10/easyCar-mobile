import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { styles } from "./ride.style";
import{json_rides} from "../../constants/dados.js";
import icons from "../../constants/icons.js";
import { useEffect, useState } from "react";


function Ride(props) {

    const userId = 2; // UTILIZADOR LOGADO NA APLICAÇÃO
    const [rides, setRides] = useState([]);

    function OpenRideDetails(id){
        props.navigation.navigate("RideDetails", {
            rideId: id,
            userId: userId
        });
    }

    async function RequestRides(){
        //Aceder a API para obter os dados das corridas
        setRides(json_rides);
    }

    useEffect(() => {
        RequestRides();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList data={rides}
                      keyExtractor={(ride) => ride.ride_id}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item})=> {
                        return(
                        <TouchableOpacity style={styles.ride} onPress={
                            ()=>OpenRideDetails(item.ride_id)
                        }>

                            <View style={styles.containerName}>
                            <Image source={icons.car} style={styles.car} />
                            <Text style={styles.name}>{item.passenger_name}</Text>
                            </View>
                            <Text style={styles.address}>Origem: {item.pickup_address}</Text>
                            <Text style={styles.address}>Destino: {item.dropoff_address}</Text>
                         </TouchableOpacity>
                           )  
                      }} />          
        </View>
    );
}


export default Ride;