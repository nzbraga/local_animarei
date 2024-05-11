import { Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default async function validationUser(name, password, passwordConfirm) {
 
  if (!name) {

    let res = { status: false, msg: "Digite seu Nome de Usuario!" }
    return res;
  }
  if (!password) {

    let res = { status: false, msg: "Digite sua Senha!" }
    return res;

  }
  if (!passwordConfirm) {

    let res = { status: false, msg: "Digite a confirmação da Senha!" }
    return res;

  }
  if (password !== passwordConfirm) {

    let res = { status: false, msg: 'As senhas nao coincidem' }
    return res;

  }


  // Recupera os dados existentes do armazenamento

  const existingUsers = await AsyncStorage.getItem('@users');
  let users = [];
  if (existingUsers) {
    // Se houver dados existentes, converte para objeto
    users = JSON.parse(existingUsers);

    // Verifica se já existe um usuário com o mesmo nome
    const existingUser = users.find(user => user.name === name);

    if (existingUser) {
      // Se já existir um usuário com o mesmo nome, exibe um alerta

      let res = { status: false, msg: "Já existe um usuário com o mesmo nome" }
      return res;
    }

  }


  const newUser = { name, password };
  //console.log("validationUser", newUser)

  let res = { data: newUser, status:true,  msg: "Usuario validado!" }
  return res;


}