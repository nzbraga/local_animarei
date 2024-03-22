import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageFavoriteData = async (newFavoriteData) => {
  try {
    let existingData = await AsyncStorage.getItem('@FavList');
    existingData = existingData ? JSON.parse(existingData) : [];

    const mergedData = [...existingData, newFavoriteData];

    await AsyncStorage.setItem('@FavList', JSON.stringify(mergedData));
    // console.log("Dados do usuário salvos localmente:", mergedData);
  } catch (error) {
    console.log("Erro ao armazenar os dados do favorito:", error);
  }
};

export const loadFavoriteData = async () => {
  try {
    const FavoriteData = await AsyncStorage.getItem('@FavList');
    if (FavoriteData !== null) {
      //console.log("Dados do usuário carregados:", FavoriteData);
      return JSON.parse(FavoriteData);
    } else {
      //console.log("Não há dados do usuário armazenados localmente.");
      return null;
    }
  } catch (error) {
    //console.error('Erro ao carregar os dados do usuário:', error);
    return null;
  }
};
