import AsyncStorage from '@react-native-async-storage/async-storage';

// Atualizar senha do usuário por ID
export const updateUserPasswordById = async (userId, newPassword) => {
  try {
    const existingUsers = await AsyncStorage.getItem('@users');

    if (existingUsers) {
      let users = JSON.parse(existingUsers);
      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        await AsyncStorage.setItem('@users', JSON.stringify(users));
        return { status: true, msg: "Atualizado com sucesso" };
      } else {
        return { status: false, msg: "Usuário não encontrado" };
      }
    } else {
      return { status: false, msg: "Não há usuários salvos" };
    }
  } catch (error) {
    return { status: false, msg: "Erro ao atualizar a senha do usuário" };
  }
};
