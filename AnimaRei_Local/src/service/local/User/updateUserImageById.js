import AsyncStorage from '@react-native-async-storage/async-storage';

// Atualizar imagem do usuário por ID
export const updateUserImageById = async (userId, image) => {
  try {
    const existingUsers = await AsyncStorage.getItem('@users');

    if (existingUsers) {
      let users = JSON.parse(existingUsers);
      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex !== -1) {
        users[userIndex].image = image;
        await AsyncStorage.setItem('@users', JSON.stringify(users));
        return { status: true, msg: "Atualizado com sucesso" };
      } else {
        //Alert.warn("Usuário não encontrado");
        return { status: false, msg: "Usuário não encontrado" };
      }
    } else {
      //Alert.warn("Não há usuários salvos");
      return { status: false, msg: "Não há usuários salvos" };
    }
  } catch (error) {
    //Alert.warn("Erro ao atualizar a imagem do usuário");
    return { status: false, msg: "Erro ao atualizar a imagem do usuário" }
  }
};
