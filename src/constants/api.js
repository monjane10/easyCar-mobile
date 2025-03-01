import axios from "axios";
import { Alert } from "react-native";

const api = axios.create({
    baseURL:"http://localhost:3000", 
    timeout: 10000,
});

function HandleError(error) {
    if (error.response?.data.error) {
        Alert.alert(error.response.data.error);
    } else {
        Alert.alert("Algo deu errado, tente novamente mais tarde");
    }
}

export {api, HandleError};
