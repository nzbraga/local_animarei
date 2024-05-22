import AsyncStorage from '@react-native-async-storage/async-storage';
import { findUserById } from './findUserById';

// Identificar quem está logado
export const loadLoginData = async () => {
  try {
    const userId = await AsyncStorage.getItem(`@Logged`);
    const res = await findUserById(JSON.parse(userId));

    //console.log("🚀 ~ loadLoginData ~ userId:", userId)
    //console.log("🚀 ~ loadLoginData ~~ res:", res)
    
    if (!res.status) {
      return { status: false, msg: "Dados do usuário nao encontrado!" };
    }
    if (res.status) {
      return { status: true, data: res.data, msg: "Dados do usuário carregados sucesso!" };
    }

  } catch (error) {
    console.error('loadLoginData - Erro ao carregar os dados do usuário:', error);
    return { status: false, msg: "Erro ao carregar os dados do usuário" };
  }
};
