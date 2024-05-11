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
      // console.log("Este título já está nos favoritos.");

      let res = { status: false, msg: "Este título já está nos favoritos." }
      return res;
    }

    const mergedData = [...existingData, newFavoriteData];

    await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(mergedData));

    //console.log("Favoritos salvos localmente:", mergedData, ">>>", user);
    let res = { status: true, msg: "Atualizado com sucesso!" }
    return res;

  } catch (error) {
    //console.log("Erro ao armazenar os dados do favorito:", error);
    let res = { status: false, msg: "Erro ao armazenar os dados do favorito" }
    return res;
  }
};

//ler lista de favorito
export const loadFavoriteData = async (userId) => {

  try {
    const FavoriteData = await AsyncStorage.getItem(`@Fav${userId}`);
    if (FavoriteData !== null && FavoriteData !== undefined) {
      //console.log("Favoritos carregados:", FavoriteData);
      let data = JSON.parse(FavoriteData);

      let res = { status: true, data, msg: "Favoritos carregados com sucesso" }
      return res

    } else {
      //console.log("Não há Favoritos armazenados localmente.");

      let res = { status: false, msg: "Não há Favoritos armazenados localmente." }
      return res
    }
  } catch (error) {
    //console.error('Erro ao carregar os Favoritos:', error);

    let res = { status: false, msg: "Erro ao carregar os Favoritos" }
    return res

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

            let res = { status: true, msg: "Atualizado com sucess" }
            return res

          } 
          if(userData[id].currentEpisode > userData[id].episodes && current > episodes) {
            let res = { status: true, msg: "Episodio Atual nao pode ser maior que o numero de Episodios" }
            return res
          }
          console.log("edit upFav - CONFERIR LOGICA MODIFICADA")
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
        console.log('action necessario')
      }

    } else {
      // Se não houver dados para esse usuário
    
      let res = { status: false, msg: "Usuário não encontrado" }
      return res
      
    }
  } catch (error) {
    //console.error('Erro ao atualizar favorito: ', error.message);
    let res = { status: false, msg: "Erro ao atualizar favorito" }
    return res
  }
};

export const removeFavList = async (userId) => {
  try {
    AsyncStorage.removeItem(`@Fav${userId}`)
    let res = {status:true , msg:"Favoritos removidos com sucesso"}
      return res;
  } catch (error) {
    //console.log("Erro ao remover os Favoritos.", error)
    let res = {status:false , msg:"Erro ao remover os Favoritos."}
    return res;
  }
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

