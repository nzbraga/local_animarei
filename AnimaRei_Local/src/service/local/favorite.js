import AsyncStorage from '@react-native-async-storage/async-storage';

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
      //console.log("🚀 ~ upFavorite ~ userData:", userData)
      userData = JSON.parse(userData);
      switch (action) {
        case '+':
          if (userData[id].currentEpisode < userData[id].episodes) {
            userData[id].currentEpisode += 1
            await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData));
            return {status: true}
          }
          break;
        case '-':
          if (userData[id].currentEpisode > 0) {
            userData[id].currentEpisode -= 1
            await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData));
            return {status: true}
          }
          break;
        case 'edit':
          if (userData[id].currentEpisode <= userData[id].episodes && current <= episodes) {
            userData[id].note = note
            userData[id].episodes = episodes
            userData[id].currentEpisode = current
            await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData));            
            return { status: true, msg: "Atualizado com sucesso" }
            
          } else{
            return { status: false, msg: "Os episodios assistidos nao pode ser maior que os episodeios totais" }
          }
           
          //console.log("edit upFav - CONFERIR LOGICA MODIFICADA")
          break;
        case 'complite':
          userData[id].currentEpisode = userData[id].episodes
          await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData))
          
            return {status: true}
            break;
            
            case 'clear':
              userData[id].currentEpisode = 0
              await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData));
              return {status: true}

          break;
          case 'delete':
            // Verificar se userData é um array e se id é um índice válido
            if (Array.isArray(userData) && id >= 0 && id < userData.length) {
                // Remover o item do array
                userData.splice(id, 1);
               // console.log("🚀 ~ upFavorite ~ userData:", userData);
                await AsyncStorage.setItem(`@Fav${userId}`, JSON.stringify(userData));
                return{ status: true }
            } else {
                console.log("Erro: índice inválido ou userData não é um array");
            }
            break;

        default:
         return { status: false, msg: "Ação não definida" }
      }

    } else {
      // Se não houver dados para esse usuário
    

      return { status: false, msg: "Usuário não encontrado" }
    }
  } catch (error) {
    //console.error('Erro ao atualizar favorito: ', error.message);
    
    return { status: false, msg: "Erro ao atualizar favorito" }
};
}
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

