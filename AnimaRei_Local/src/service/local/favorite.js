import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

//salvar nova lista
export const storageFavoriteData = async (userId, newFavoriteData) => {
  try {
    let existingData = await AsyncStorage.getItem(`@Fav${userId}`);
    existingData = existingData ? JSON.parse(existingData) : [];

    // Check if the title already exists in the existing data
    const titleExists = existingData.some(item => item.title === newFavoriteData.title);

    if (titleExists) {
      Alert.alert("Este título já está nos favoritos.");
      return; // Do not proceed further
    }

    const mergedData = [...existingData, newFavoriteData];

    await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(mergedData));
    Alert.alert("Atualizado com sucesso!");
    //console.log("Favoritos salvos localmente:", mergedData, ">>>", user);
  } catch (error) {
    console.log("Erro ao armazenar os dados do favorito:", error);
  }
};

//ler lista de favorito
export const loadFavoriteData = async (userId) => {

  try {
    const FavoriteData = await AsyncStorage.getItem(`@Fav${userId}`);
    if (FavoriteData !== null && FavoriteData !== undefined) {
      //console.log("Favoritos carregados:", FavoriteData);
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



export const upFavorite = async (userId, id, action, note, current, episodes) => {
  try {
    let userData = await AsyncStorage.getItem(`@Fav${userId}`);
    if (userData !== null) {
      userData = JSON.parse(userData);
      switch (action) {
        case '+':
          if (userData[id].currentEpisode < userData[id].episodes) {
            userData[id].currentEpisode += 1
            await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData));
          }
          break;
        case '-':
          if (userData[id].currentEpisode > 0) {
            userData[id].currentEpisode -= 1
            await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData));
          }
          break;
        case 'edit':         
        if (userData[id].currentEpisode <= userData[id].episodes && current <= episodes) {
          userData[id].note = note
          userData[id].episodes = episodes
          userData[id].currentEpisode = current
          await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData));
          return Alert.alert("Atualizado com sucesso")
        } else {
          return Alert.alert('Episodio Atual nao pode ser maior que o numero de Episodios ')
        }
          break;
        case 'complite':
          userData[id].currentEpisode = userData[id].episodes
          await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData));
          break;
        case 'clear':
          userData[id].currentEpisode = 0
          await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData));
          break;
        case 'delete':
          // Remover o item do array
          userData.splice(id, 1);
          await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData));
          break;

        default:
          // Caso de ação não reconhecida
          throw new Error('Ação não reconhecida');
      }

    } else {
      // Se não houver dados para esse usuário
      throw new Error('Usuário não encontrado');
    }
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error.message);
    throw error;
  }
};

export const removeFavList = async (userId) =>{
  AsyncStorage.removeItem(`@Fav${userId}`)
}


export const allKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();   
    return keys;
  } catch (error) {
    console.error('Error fetching keys from AsyncStorage:', error);
    return [];
  }
};

