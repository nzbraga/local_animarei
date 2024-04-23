import { Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default async function validationUser(user, password) {

    //console.log("validationUser", user)
    //console.log("validationUser", password)
    //console.log("validationUser",passwordConfirm)

    if (!user) {
        return Alert.alert("Digite seu Nome de Usuario!");
    }
    if (!password) {
        return Alert.alert("Digite sua Senha!");
    }

    const userExistent = await AsyncStorage.getItem(`@${user}`)

    if (userExistent) {
        return Alert.alert("Usuario ja cadastrado!");
    }

    const newUser = { name: user, password: password};
    //console.log("validationUser", newUser)

    return newUser;
}
