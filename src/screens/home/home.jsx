import { ImageBackground, Image, Text, TouchableOpacity, Alert, View } from "react-native"
import icons from "../../constants/icons.js";
import { styles } from "./home.style.js";

function Home(props) {

    function OpenPassenger(){
      props.navigation.navigate("Passenger");

    }

    
    function OpenRide(){
        props.navigation.navigate("Ride");
    }



    return (
        <ImageBackground source={icons.bg} resizeMode="cover" style={styles.bg}>

            <Image source={icons.logo} style={styles.logo} />
            <TouchableOpacity style={styles.btn} onPress={OpenPassenger}>
                <Image source={icons.passenger}
                    style={styles.img} />
                <Text style={styles.title}>Passageiro</Text>
                <Text style={styles.text}>O teu táxi está à espera, vamos embora!</Text>
            </TouchableOpacity>

           
            <TouchableOpacity style={styles.btn} onPress={OpenRide}>
                <Image source={icons.driver}
                    style={styles.img} />
                <Text style={styles.title}>Motorista</Text>
                <Text style={styles.text}>Conduza, facture e ajude a movimentar a cidade!</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Desenvolvido por <Text style={{fontWeight: 'bold', color: "white"}}>Lourenço Monjane</Text></Text>
            </View>

        </ImageBackground>
    );
}


export default Home;
