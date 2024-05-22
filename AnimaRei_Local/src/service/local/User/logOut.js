import AsyncStorage from '@react-native-async-storage/async-storage';

// Logout do usuário
export const logOut = async () => {
  try {
    await AsyncStorage.removeItem(`@Logged`);
    await AsyncStorage.removeItem('@FavList');
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false;
  }
};
