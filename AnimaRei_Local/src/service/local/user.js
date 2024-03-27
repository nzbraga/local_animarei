import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


export const storageUserData = async (name, password) => {

  try {
    const user = { password }   
    const newUser = JSON.stringify(user);
    await AsyncStorage.setItem(`@${name}`, newUser);
    //console.log("Dados do usuário salvos localmente:", newUser);
  } catch (error) {
    console.log("Erro ao armazenar os dados do usuário:", error);
    Alert.alert("Erro ao armazenar os dados do usuário")
  }
};

export const storageLoginData = async ( name ) => {

  try {
    const user = { name }
    const newUser = JSON.stringify(user);
    await AsyncStorage.setItem(`@Logged`, newUser);
    //console.log("Dados do usuário salvos localmente:", newUser);
  } catch (error) {
    console.log("Erro ao logar os dados do usuário:", error);
    Alert.alert("Erro ao logar os dados do usuário")
  }
};

export const loadUserData = async (name, password) => {
  try {
    const userData = await AsyncStorage.getItem(`@${name}`);
    const user = JSON.parse(userData)
    //console.log("loadUserData: ", userData)
    if (user !== null) {
      if (user.password === password){
        return user;
      }
    } else {
      console.log("Não há dados do usuário armazenados localmente.");      
      return Alert.alert("Usuario não encontrado")
    }
  } catch (error) {
    console.error('Erro ao carregar os dados do usuário:', error);
    return Alert.alert("Erro ao carregar os dados do usuário!")
  }
};

export const loadLoginData = async () => {
  try {
    const userData = await AsyncStorage.getItem(`@Logged`);
    const user = JSON.parse(userData)
    if (user !== null) {      
        return user;      
    } else {
      //console.log("Não há dados do usuário armazenados localmente.");
      return null;
    }
  } catch (error) {
    console.error('Erro ao carregar os dados do usuário:', error);
    return null;
  }
};


export async function logOut() {

  try {
    await AsyncStorage.removeItem(`@Logged`);
    await AsyncStorage.removeItem('@FavList');
    return true
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false
  }
}