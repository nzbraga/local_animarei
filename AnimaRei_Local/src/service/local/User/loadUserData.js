import AsyncStorage from '@react-native-async-storage/async-storage';

// Autenticar usuário
export const loadUserData = async (name, password) => {
  try {
    const existingUsers = await AsyncStorage.getItem('@users');
    let users = [];

    if (existingUsers) {
      users = JSON.parse(existingUsers);
      const existingUser = users.find(user => user.name === name);

      if (existingUser && existingUser.password === password) {
        const userData = { id: existingUser.id, name: existingUser.name, image: existingUser.image };
        return { status: true, data: userData, msg: "Usuário Logado" };
      } else {
        return { status: false, msg: "Usuário ou Senha incorreta" };
      }
    } else {
      return { status: false, msg: "Usuário não encontrado" };
    }
  } catch (error) {
    return { status: false, msg: "Erro ao logar!" };
  }
};