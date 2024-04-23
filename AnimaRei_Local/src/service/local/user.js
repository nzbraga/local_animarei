import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


//salva um novo usuario
export const storageUserData = async (name, password) => {

  try {
    const user = { password }   
    const newUser = JSON.stringify(user);
    await AsyncStorage.setItem(`@${name}`, newUser);
    //console.log("Dados do usuário salvos localmente:", newUser);
    return true
  } catch (error) {
    console.log("Erro ao armazenar os dados do usuário:", error);
    Alert.alert("Erro ao armazenar os dados do usuário")
  }
};

// logar usuario
export const storageLoginData = async ( name ) => {

  try {
    const user = { name }
    const newUser = JSON.stringify(user);
    await AsyncStorage.setItem(`@Logged`, newUser);
    //console.log("Dados do usuário salvos localmente:", newUser);
    return true
  } catch (error) {
    console.log("Erro ao logar os dados do usuário:", error);
    Alert.alert("Erro ao logar os dados do usuário")
  }
};


// autenticar usuario logado
export const loadUserData = async (name, password) => {
  try {
    const userData = await AsyncStorage.getItem(`@${name}`);
    const user = JSON.parse(userData)
    console.log("loadUserData: ", userData)
    if (user !== null) {
      if (user.password === password){
        console.log('ok')
        return user;
      }
      return Alert.alert('Senha ou Usuario Incorreto!')
    } else {
      console.log("Não há dados do usuário armazenados localmente.");      
      return Alert.alert("Usuario não encontrado")
    }
  } catch (error) {
    console.error('Erro ao carregar os dados do usuário:', error);
    return Alert.alert("Erro ao carregar os dados do usuário!")
  }
};


//identificar quem esta logado
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


export const deleteUser = async (name, password)=> {
  try {
    const userData = await AsyncStorage.getItem(`@${name}`);
    const user = JSON.parse(userData)
    //console.log("loadUserData: ", userData)
    if (user !== null) {
      if (user.password === password){
        await AsyncStorage.removeItem(`@${name}`)
        return true
      }else{
        Alert.alert('Senha Incorreta')
      }
    }
  }
  catch (error) {
    console.log("Erro ao deletar Usuario ", error)
  }
  
}
export const logOut = async () => {  

  try {
    await AsyncStorage.removeItem(`@Logged`);
    await AsyncStorage.removeItem('@FavList');
    return true
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false
  }
}