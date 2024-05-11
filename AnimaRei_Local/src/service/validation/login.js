import { Alert } from "react-native"

export default async function validationUser(user, password) {

    if (!user) {

        let res = {status: false, msg:"Digite seu Nome de Usuario!"}
          return res;
    }
    if (!password) {
        
      let res = {status: false, msg:"Digite sua Senha!"}
        return res;
        
    }
    const newUser = { name: user, password};
    //console.log("validationUser", newUser)

    let res = {data: newUser, status: true , msg:"Usuario validado!"}
    return res;
}
