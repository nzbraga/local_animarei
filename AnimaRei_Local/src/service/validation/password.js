import { Alert } from "react-native"

export default async function validationUser(user, password, passwordConfirm) {

    //console.log("validationUser", user)
    //console.log("validationUser", password)
    //console.log("validationUser",passwordConfirm)

    if (!user) {
        let res = {status: false, msg:"Digite seu Nome de Usuario!"}
        return res;
    }
    if (!password) {
        let res = {status: false, msg:"Digite sua Senha!"}
        return res;
    }
    if (!passwordConfirm) {
        let res = {status: false, msg:"Digite a confirmação da Senha!"}
          return res;
    }
    if (password !== passwordConfirm) {
        let res = {status: false, msg:'As senhas nao coincidem'}
        return res;

    }

    const newUser = { name: user, password: password};
    //console.log("validationUser", newUser)
    let res = {data: newUser , status:true,  msg:"Usuario validado!"}
    return res;
}
