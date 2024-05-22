import { Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default async function validationUser(name, newName, password) {

    if (!name) {

        let res = { status: false, msg: "Digite seu Nome de Usuario!" }
        return res;
    }
    if (!password) {

        let res = { status: false, msg: "Digite sua Senha!" }
        return res;

    }
    if (newName === name) {

        let res = { status: false, msg: "Digite um nome de usuario diferente do atual!" }
        return res;

    }

    const newUser = { name, password, newName };
    //console.log("validationUser", newUser)
   
    let res = {data: newUser , status:true , msg:'Usuário não encontrado'}
    return res;
}
