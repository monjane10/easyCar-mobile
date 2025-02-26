import { Text } from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";



function Passenger(props) {
    return (
    <>
    
    <Text style={{fontSize: 30}}>Tela Passageiro</Text>
    <Text style={{fontSize: 30}}>Mapa</Text>
    <Text style={{fontSize: 30}}>Destino</Text>
    <MyButton text="CONFIRMAR" />

    </>
    );
}


export default Passenger;