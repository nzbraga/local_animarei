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


export const upFavorite = async (user, id, action) => {  
  
  console.log("upFav- ",user, id,action)

  try {
    await AsyncStorage.getItem(`@Fav${user}`).then((upFavoriteData)=>{

      console.log("Favoritos carregados:", upFavoriteData);
      const newUp = JSON.parse(upFavoriteData)
      console.log("Favoritos parse -:", newUp);
    })
   
  } catch (error) {
    console.error('Erro ao carregar os Favoritos:', error);
    return null;
  }
};

