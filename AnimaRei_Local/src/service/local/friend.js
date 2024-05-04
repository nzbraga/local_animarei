import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

//salvar nova lista
export const storageFriendData = async (userId, friend) => {
  try {
    let existingData = await AsyncStorage.getItem(`@Friend${userId}`);
    existingData = existingData ? JSON.parse(existingData) : [];

    // Verifica se já existe um amigo com o mesmo ID
    const friendExists = existingData.some(item => item.id === friend.id);

    if (friendExists) {
      Alert.alert("Vocês já são amigos!");
      return; // Não prossegue mais
    }

    const mergedData = [...existingData, friend];

    await AsyncStorage.setItem(`@Friend${userId}`, JSON.stringify(mergedData));
    Alert.alert("Adicionado com sucesso!");
    console.log("Friend salvos localmente:", mergedData, ">>>", userId);
  } catch (error) {
    console.log("Erro ao armazenar os dados do amigo:", error);
  }
};


//ler lista de favorito
export const loadFriendData = async (userId) => {

  try {
    const FriendData = await AsyncStorage.getItem(`@Friend${userId}`);
    if (FriendData !== null && FriendData !== undefined) {
      console.log("Friend carregados:", FriendData);
      return JSON.parse(FriendData);
    } else {
      //console.log("Não há Favoritos armazenados localmente.");
      return null;
    }
  } catch (error) {
    console.error('Erro ao carregar os Favoritos:', error);
    return null;
  }
};

export const removeFavList = async (userId) =>{
  AsyncStorage.removeItem(`@Friend${userId}`)
}




