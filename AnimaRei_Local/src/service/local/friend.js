import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

//salvar nova lista
export const storageFriendData = async (user, newFriend) => {
  try {
    let existingData = await AsyncStorage.getItem(`@Friend${user}`);
    existingData = existingData ? JSON.parse(existingData) : [];

    // Check if the title already exists in the existing data
    const friendExists = existingData.some(item => item.name === newFriend.name);

    if (friendExists) {
      Alert.alert("Voces ja são amigos!");
      return; // Do not proceed further
    }

    const mergedData = [...existingData, newFriend];

    await AsyncStorage.setItem(`@Friend${user}`, JSON.stringify(mergedData));
    Alert.alert("Adicionado com sucesso!");
    console.log("Friend salvos localmente:", mergedData, ">>>", user);
  } catch (error) {
    console.log("Erro ao armazenar os dados do favorito:", error);
  }
};

//ler lista de favorito
export const loadFavoriteData = async (user) => {

  try {
    const FavoriteData = await AsyncStorage.getItem(`@Friend${user}`);
    if (FavoriteData !== null && FavoriteData !== undefined) {
      console.log("Friend carregados:", FavoriteData);
      return JSON.parse(FavoriteData);
    } else {
      //console.log("Não há Favoritos armazenados localmente.");
      return null;
    }
  } catch (error) {
    console.error('Erro ao carregar os Favoritos:', error);
    return null;
  }
};



export const upFavorite = async () => {
 
};

export const removeFavList = async (user) =>{
  AsyncStorage.removeItem(`@Friend${user}`)
}

export const findFriend = async (name) => {
  try {
    const friend = await AsyncStorage.getItem(`@${name}`);
    //console.log(true)
    return true;
  } catch (error) {
    console.error('Error fetching keys from AsyncStorage:', error);
    return [];
  }
};
export const allKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys)
    //return keys;
  } catch (error) {
    console.error('Error fetching keys from AsyncStorage:', error);
    return [];
  }
};


