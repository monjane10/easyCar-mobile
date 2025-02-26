import { Text, TextInput, View } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styles } from './passenger.style.js'
import { useState } from "react";
import icons from '../../constants/icons.js'



function Passenger(props) {

    const [myLocation, setMyLocation] = useState({
        latitude: -25.929247,
        longitude: 32.585896
    });



    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                provider={PROVIDER_DEFAULT}
                initialRegion={{
                    latitude: -25.929247,
                    longitude: 32.585896,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                }}>
                <Marker coordinate={{
                    latitude: -25.929247,
                    longitude: 32.585896,
                }}
                    title="Hayati Monjane"
                    description="FPLM, 4001"
                    image={icons.location} style={styles.marker} />

            </MapView>

            <View style={styles.footer}>

            <View style={styles.footerText}>
                    <Text style={styles.title}>Encontre o teu táxi</Text>
                </View>

                <View style={styles.footerFields}>
                    <Text>Origem</Text>
                    <TextInput style={styles.input} />
                </View>

                <View style={styles.footerFields}>
                    <Text >Destino</Text>
                    <TextInput style={styles.input} />
                </View>
            </View>

            <MyButton text="CONFIRMAR" theme="default" />

        </View>
    );
}


export default Passenger;