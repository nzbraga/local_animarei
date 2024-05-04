import { Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default async function validationUser(name, newName, password) {

    if (!name) {
        return Alert.alert("Digite seu Nome de Usuario!");
    }

    if (newName === name) {
        return Alert.alert("Digite um nome de usuario diferente do atual!");
    }
    if (!password) {
        return Alert.alert("Digite sua Senha!");
    }

    const newUser = { name, password: password, newName};
    //console.log("validationUser", newUser)

    return newUser;
}
