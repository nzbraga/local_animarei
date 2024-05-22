import AsyncStorage from '@react-native-async-storage/async-storage';

// Excluir usuário por ID
export const deleteUser = async (id) => {
  try {
    const existingUsers = await AsyncStorage.getItem('@users');
    let users = [];

    if (existingUsers) {
      users = JSON.parse(existingUsers);
      const existingUserIndex = users.findIndex(user => user.id === id);

      if (existingUserIndex !== -1) {
        users.splice(existingUserIndex, 1);
        await AsyncStorage.setItem('@users', JSON.stringify(users));
        return { status: true, msg: 'Usuário deletado com sucesso' }
      } else {
        console.log('Usuário não encontrado');
        return { status: false, msg: 'Usuário não encontrado' }
      }
    }
  } catch (error) {
    console.error('Erro ao deletar:', error);  
    return { status: false, msg: 'Erro ao deletar o usuário!' }
  }
};
