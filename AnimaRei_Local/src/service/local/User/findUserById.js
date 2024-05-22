import AsyncStorage from '@react-native-async-storage/async-storage';

export const findUserById = async (id) => {
  const existingUsers = await AsyncStorage.getItem('@users');
  let users = [];

  //console.log("🚀 ~ findUserById ~~ id: ~", id)
  
  if (existingUsers) {
    users = JSON.parse(existingUsers);
    const existingUser = users.find(user => user.id === id);
    //console.log("🚀 ~ findUserById ~ existingUser:", existingUser)

    if (existingUser) {
      const user = { name: existingUser.name, id: existingUser.id, image: existingUser.image, theme: existingUser.theme };
      //console.log("🚀 ~ findUserById ~ user:", user)
      return { data: user, status: true, msg: "Usuário encontrado com sucesso" };
    }
  }
  
  if(!existingUsers){
    return { status: false, msg: "Usuário não encontrado" };
  }

};