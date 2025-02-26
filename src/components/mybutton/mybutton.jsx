import { Text, TouchableOpacity } from "react-native";
import {styles} from './button.js'


function MyButton(props){
    return <TouchableOpacity style={styles.btnYellow}>
        <Text style={styles.textDark}>{props.text}</Text>
    </TouchableOpacity>

}



export default MyButton;
