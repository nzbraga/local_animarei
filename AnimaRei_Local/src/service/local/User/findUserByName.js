import AsyncStorage from '@react-native-async-storage/async-storage';

export const findUserByName = async (name) => {
  const existingUsers = await AsyncStorage.getItem('@users');
  let users = [];

  if (existingUsers) {
    users = JSON.parse(existingUsers);
    const existingUser = users.find(user => user.name === name);

    if (existingUser) {
      const user = { name: existingUser.name, id: existingUser.id, image: existingUser.image };
      return { data: user, status: true, msg: "Usuário encontrado com sucesso" };
    }
  }

  return { status: false, msg: 'Usuário não encontrado' };
};
