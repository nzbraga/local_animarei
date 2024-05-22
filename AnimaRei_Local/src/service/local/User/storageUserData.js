import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

// Salva um novo usuário
export const storageUserData = async (data) => {
  try {
    const existingUsers = await AsyncStorage.getItem('@users');
    let users = [];

    if (existingUsers) {
      users = JSON.parse(existingUsers);
      const existingUser = users.find(user => user.name === data.name);

      if (existingUser) {
        return { status: false, msg: "Já existe um usuário com o mesmo nome" };
      }
    }

    const userId = uuidv4();
    data.id = userId;
    users.push(data);
    
    await AsyncStorage.setItem('@users', JSON.stringify(users));

    return { status: true, data, msg: "Usuário criado com sucesso!" };

  } catch (error) {
    return { status: false, msg: "Erro ao armazenar os dados do usuário" };
  }
};