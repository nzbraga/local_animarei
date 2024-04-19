import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const storageFavoriteData = async (user, newFavoriteData) => {
  try {
    let existingData = await AsyncStorage.getItem(`@Fav${user}`);
    existingData = existingData ? JSON.parse(existingData) : [];

    // Check if the title already exists in the existing data
    const titleExists = existingData.some(item => item.title === newFavoriteData.title);

    if (titleExists) {
      Alert.alert("Este título já está nos favoritos.");
      return; // Do not proceed further
    }

    const mergedData = [...existingData, newFavoriteData];

    await AsyncStorage.setItem(`@Fav${user}`, JSON.stringify(mergedData));
    Alert.alert("Adicionado com sucesso!");
    //console.log("Favoritos salvos localmente:", mergedData, ">>>", user);
  } catch (error) {
    console.log("Erro ao armazenar os dados do favorito:", error);
  }
};

export const loadFavoriteData = async (user) => {

  try {
    const FavoriteData = await AsyncStorage.getItem(`@Fav${user}`);
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



export const upFavorite = async (user, id, action, note, current, episodes) => {
  try {
    let userData = await AsyncStorage.getItem(`@Fav${user}`);
    if (userData !== null) {
      userData = JSON.parse(userData);
      switch (action) {
        case '+':
          if (userData[id].currentEpisode < userData[id].episodes) {
            userData[id].currentEpisode += 1
          }
          break;
        case '-':
          if (userData[id].currentEpisode > 0) {
            userData[id].currentEpisode -= 1
          }
          break;
        case 'note':  

        //if (userData[id].currentEpisode < userData[id].episodes) {}
                 
          userData[id].note = note
          userData[id].episodes = episodes
          userData[id].currentEpisode = current

          break;
        case 'complite':
          userData[id].currentEpisode = userData[id].episodes
          break;
        case 'clear':
          userData[id].currentEpisode = 0
          break;
        case 'delete':
          // Remover o item do array
          userData.splice(id, 1);
          break;

        default:
          // Caso de ação não reconhecida
          throw new Error('Ação não reconhecida');
      }
      await AsyncStorage.setItem(`@Fav${user}`, JSON.stringify(userData));

    } else {
      // Se não houver dados para esse usuário
      throw new Error('Usuário não encontrado');
    }
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error.message);
    throw error;
  }
};




export const allKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys)
    return keys;
  } catch (error) {
    console.error('Error fetching keys from AsyncStorage:', error);
    return [];
  }
};

