import { ImageBackground, Image, Text, TouchableOpacity } from "react-native"
import icons from "../../constants/icons.js";
import { styles } from "./home.style.js";
function Home() {


    return (
        <ImageBackground source={icons.bg} resizeMode="cover" style={styles.bg}>

            <Image source={icons.logo} style={styles.logo} />
            <TouchableOpacity style={styles.btn}>
                <Image source={icons.passenger}
                    style={styles.img} />
                <Text style={styles.title}>Passageiro</Text>
                <Text style={styles.text}>Encontre um táxi para ti</Text>
            </TouchableOpacity>

           
            <TouchableOpacity style={styles.btn}>
                <Image source={icons.driver}
                    style={styles.img} />
                <Text style={styles.title}>Motorista</Text>
                <Text style={styles.text}>Forneça Serviços de Táxi</Text>
            </TouchableOpacity>

        </ImageBackground>
    );
}


export default Home;
