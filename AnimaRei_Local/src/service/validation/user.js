import { Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default async function validationUser(user, password, passwordConfirm) {

    //console.log("validationUser", user)
    //console.log("validationUser", password)
    //console.log("validationUser",passwordConfirm)

    if (!user) {
        return Alert.alert("Digite seu Nome de Usuario!");
    }
    if (!password) {
        return Alert.alert("Digite sua Senha!");
    }
    if (!passwordConfirm) {
        return Alert.alert("Digite a confirmação da Senha!");
    }
    if (password !== passwordConfirm) {
        return Alert.alert('As senhas nao coincidem');
    }

    const userExistent = await AsyncStorage.getItem(`@${user}`)

    if (userExistent) {
        return Alert.alert("Usuario ja cadastrado!");
    }

    const newUser = { name: user, password: password};
    //console.log("validationUser", newUser)

    return newUser;
}
