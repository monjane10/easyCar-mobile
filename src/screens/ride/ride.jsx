import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { styles } from "./ride.style";
import{json_rides} from "../../constants/dados.js";
import icons from "../../constants/icons.js";


function Ride(props) {

    function OpenRideDetails(id){
        console.log("id:" + "" + id);
        props.navigation.navigate("RideDetails");
    }

    return (
        <View style={styles.container}>
            <FlatList data={json_rides}
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