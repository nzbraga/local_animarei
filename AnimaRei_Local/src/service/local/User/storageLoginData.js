import AsyncStorage from '@react-native-async-storage/async-storage';

// Logar usuário
export const storageLoginData = async (id) => {
  try {
    await AsyncStorage.setItem(`@Logged`, id);
    const newData = JSON.parse(id);

    return { status: true, data: newData, msg: "Usuário logado com sucesso" };

  } catch (error) {
    return { status: false, msg: "Erro ao logar os dados do usuário" };
  }
};
