import { ImageBackground,Image, Text } from "react-native"
import icons from "../../constants/icons.js";
import { styles } from "./home.style.js";
function Home() {


    return (
        <ImageBackground source={icons.bg} resizeMode="cover" style={styles.bg}>

            <Image source={icons.logo} />

        </ImageBackground>
    );
}


export default Home;
