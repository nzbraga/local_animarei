import AsyncStorage from '@react-native-async-storage/async-storage';

//salvar nova lista
export const storageFriendData = async (userId, friend) => {
  try {
    let existingData = await AsyncStorage.getItem(`@Friend${userId}`);
    existingData = existingData ? JSON.parse(existingData) : [];

    // Verifica se já existe um amigo com o mesmo ID
    const friendExists = existingData.some(item => item.id === friend.id);

    if (friendExists) {
     // console.log("storageFriend - Vocês já são amigos!");
      
      let res = {status:false , msg:"Vocês já são amigos!"}
      return res;
    }

    const mergedData = [...existingData, friend];

    await AsyncStorage.setItem(`@Friend${userId}`, JSON.stringify(mergedData));
    
    console.log("Friend salvos localmente:", mergedData, ">>>", userId);
           
    let res = {status:true , msg:"Adicionado com sucesso!"}
    return res;

  } catch (error) {
    console.log("Erro ao armazenar os dados do amigo:", error);
               
    let res = {status:false , msg:"Erro ao armazenar os dados do amigo"}
    return res;
  }
};

//ler lista de Amigo
export const loadFriendData = async (userId) => {

  try {
    const FriendData = await AsyncStorage.getItem(`@Friend${userId}`);
    if (FriendData !== null && FriendData !== undefined) {
      console.log("Friend carregados:", FriendData);
      let data = JSON.parse(FriendData);

      let res = {status:true , data,  msg:"Adicionado com sucesso!"}
      return res;
      

    } else {
      //console.log("Não há Amigos armazenados localmente.");
    
      let res = {status:false , msg:"Não há Amigos armazenados localmente."}
      return res;

    }
  } catch (error) {
   // console.error('Erro ao carregar os Amigos:', error);
    
    let res = {status:false , msg:"Erro ao carregar os Amigos."}
    return res;
  }
};

export const removeFriendList = async (userId) =>{
  try {    
    AsyncStorage.removeItem(`@Friend${userId}`)
    let res = {status:true , msg:"Amigos removidos com sucesso"}
      return res;
  } catch (error) {
    //console.log("Erro ao remover os Amigos.", error)
    let res = {status:false , msg:"Erro ao remover os Amigos."}
    return res;
  }
}




