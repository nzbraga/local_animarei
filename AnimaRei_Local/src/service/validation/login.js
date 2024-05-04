import { Alert } from "react-native"

export default async function validationUser(user, password) {

    if (!user) {
        return Alert.alert("Digite seu Nome de Usuario!");
    }
    if (!password) {
        return Alert.alert("Digite sua Senha!");
    }
   
    const newUser = { name: user, password};
    //console.log("validationUser", newUser)

    return newUser;
}
