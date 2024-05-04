import { Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default async function validationUser(name, password, passwordConfirm) {

    //console.log("validationUser", user)
    //console.log("validationUser", password)
    //console.log("validationUser",passwordConfirm)

    if (!name) {
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
          Alert.alert("Já existe um usuário com o mesmo nome");
          return false;
        }
      }

    const newUser = { name, password};
    //console.log("validationUser", newUser)

    return newUser;
}
