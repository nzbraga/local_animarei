import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


//salva um novo usuario
export const storageUserData = async (data) => {
  try {
    // Recupera os dados existentes do armazenamento
    const existingUsers = await AsyncStorage.getItem('@users');
    let users = [];
    
    if (existingUsers) {
      // Se houver dados existentes, converte para objeto
      users = JSON.parse(existingUsers);
      
      // Verifica se já existe um usuário com o mesmo nome
      const existingUser = users.find(user => user.name === data.name);
      
      if (existingUser) {
        // Se já existir um usuário com o mesmo nome, exibe um alerta
        Alert.alert("Já existe um usuário com o mesmo nome");
        return false;
      }
    }

    // Adiciona o novo usuário aos dados existentes
    users.push(data);

    // Salva os dados atualizados no armazenamento
    await AsyncStorage.setItem('@users', JSON.stringify(users));
    //console.log("Dados do usuário salvos localmente:", data);
    
    return true;
  } catch (error) {
    // Em caso de erro, exibe um alerta
    Alert.alert("Erro ao armazenar os dados do usuário");
    return false;
  }
};

// logar usuario
export const storageLoginData = async ( id ) => {

  try {
    const newId = JSON.stringify(id);
    await AsyncStorage.setItem(`@Logged`, newId);
    //console.log("Dados do usuário salvos localmente:", newUser);
    return true
  } catch (error) {
    //console.log("Erro ao logar os dados do usuário:", error);
    Alert.alert("Erro ao logar os dados do usuário")
  }
};

export const findUserById = async (id) => {
  const existingUsers = await AsyncStorage.getItem('@users');
  let users = [];
  
  //console.log("findUserById existings: ", existingUsers);           
  if (existingUsers) {
    // Se houver dados existentes, converte para objeto
    users = JSON.parse(existingUsers);
    
    // Converte o ID para número, já que os IDs no array de usuários são números
    id = parseInt(id);
    //console.log("findUserById id ", id);           
    
    // Verifica se já existe um usuário com o mesmo id
    const existingUser = users.find(user => user.id === id);
   // console.log("findUserById existing: ", existingUser);
    
    if (existingUser) {   
      let user = { name: existingUser.name, id: existingUser.id, image: existingUser.image };  
      //console.log(user);
      return user;
    }
  } else {
    console.log('Usuário não encontrado');
  }
}

export const findUserByName = async (name) => {
  const existingUsers = await AsyncStorage.getItem('@users');
  let users = [];
  
  //console.log("findUserByName existings: ", existingUsers);           
  if (existingUsers) {
    // Se houver dados existentes, converte para objeto
    users = JSON.parse(existingUsers);
    
    // Verifica se já existe um usuário com o mesmo id
    const existingUser = users.find(user => user.name === name);
   // console.log("findUserByName existing: ", existingUser);
    
   if (existingUser) {   
    let user = { name: existingUser.name, id: existingUser.id, image: existingUser.image };  
    //console.log(user);
    return user;
  }
  } else {
    console.log('Usuário não encontrado');
  }
}

// autenticar usuario
export const loadUserData = async (name, password) => {
  try {   
    const existingUsers = await AsyncStorage.getItem('@users');
    let users = [];
    
    if (existingUsers) {
      // Se houver dados existentes, converte para objeto
      users = JSON.parse(existingUsers);
      
      // Verifica se já existe um usuário com o mesmo nome
      const existingUser = users.find(user => user.name === name);
      
      if (existingUser) {
        if(existingUser.password === password){ 
           let userData = { id:existingUser.id, name: existingUser.name , image: existingUser.image}        
          return userData
        }else{
          Alert.alert("Usuario ou Senha incorreta")
        }
      }else{
        console.log('Usuario nao encontrado')
      }
    }
  
  } catch (error) {
    //console.error('Erro ao carregar os dados do usuário:', error);
    return Alert.alert("Erro ao logar!")
  }
};

//identificar quem esta logado
export const loadLoginData = async () => {
  try {
    let userId = await AsyncStorage.getItem(`@Logged`);
    let id = JSON.parse(userId)
    
    //console.log('loadLoginData id', id)
    let user = findUserById(id)
   
    
    //console.log('loadLoginData user', user)
    if (user !== null) {      
        return user;      
    } else {
      //console.log("Não há dados do usuário armazenados localmente.");
      return null;
    }
  } catch (error) {
    console.error('Erro ao carregar os dados do usuário:', error);
    return null;
  }
};

export const updateUserNameById = async (userId, newName) => {
  try {
    // Recupera os dados existentes do armazenamento
    const existingUsers = await AsyncStorage.getItem('@users');
    
    if (existingUsers) {
      // Se houver dados existentes, converte para objeto
      let users = JSON.parse(existingUsers);
      
      // Procura o usuário pelo ID
      const userIndex = users.findIndex(user => user.id === userId);
      
      if (userIndex !== -1) {
        // Atualiza o nome do usuário
        users[userIndex].name = newName;
        
        // Salva os dados atualizados no armazenamento
        await AsyncStorage.setItem('@users', JSON.stringify(users));
        
        // Retorna verdadeiro para indicar sucesso
        return true;
      } else {
        // Se o usuário com o ID especificado não for encontrado, exibe um alerta
        Alert.alert("Usuário não encontrado");
        return false;
      }
    } else {
      // Se não houver dados existentes, exibe um alerta
      Alert.alert("Não há usuários salvos");
      return false;
    }
  } catch (error) {
    // Em caso de erro, exibe um alerta
    Alert.alert("Erro ao atualizar o nome do usuário");
    return false;
  }
};

export const updateUserPasswordById = async (userId, newPassword) => {
  try {
    // Recupera os dados existentes do armazenamento
    const existingUsers = await AsyncStorage.getItem('@users');
    
    if (existingUsers) {
      // Se houver dados existentes, converte para objeto
      let users = JSON.parse(existingUsers);
      
      // Procura o usuário pelo ID
      const userIndex = users.findIndex(user => user.id === userId);
      
      if (userIndex !== -1) {
        // Atualiza a senha do usuário
        users[userIndex].password = newPassword;
        
        // Salva os dados atualizados no armazenamento
        await AsyncStorage.setItem('@users', JSON.stringify(users));
        
        // Retorna verdadeiro para indicar sucesso
        return true;
      } else {
        // Se o usuário com o ID especificado não for encontrado, exibe um alerta
        Alert.alert("Usuário não encontrado");
        return false;
      }
    } else {
      // Se não houver dados existentes, exibe um alerta
      Alert.alert("Não há usuários salvos");
      return false;
    }
  } catch (error) {
    // Em caso de erro, exibe um alerta
    Alert.alert("Erro ao atualizar a senha do usuário");
    return false;
  }
};

export const updateUserImageById = async (userId, image) => {
  try {
    // Recupera os dados existentes do armazenamento
    const existingUsers = await AsyncStorage.getItem('@users');
    
    if (existingUsers) {
      // Se houver dados existentes, converte para objeto
      let users = JSON.parse(existingUsers);
      
      // Procura o usuário pelo ID
      const userIndex = users.findIndex(user => user.id === userId);
      
      if (userIndex !== -1) {
        // Atualiza a senha do usuário
        users[userIndex].image = image;
        
        // Salva os dados atualizados no armazenamento
        await AsyncStorage.setItem('@users', JSON.stringify(users));
        
        // Retorna verdadeiro para indicar sucesso
        return true;
      } else {
        // Se o usuário com o ID especificado não for encontrado, exibe um alerta
        Alert.alert("Usuário não encontrado");
        return false;
      }
    } else {
      // Se não houver dados existentes, exibe um alerta
      Alert.alert("Não há usuários salvos");
      return false;
    }
  } catch (error) {
    // Em caso de erro, exibe um alerta
    Alert.alert("Erro ao atualizar a senha do usuário");
    return false;
  }
};

export const deleteUser = async (id) => { 
  try {   
     // Recupera os dados existentes do armidnto
     const existingUsers = await AsyncStorage.getItem('@users');
     let users = [];
     
     if (existingUsers) {
       // Se houver dados existentes, converte para objeto
       users = JSON.parse(existingUsers);
       
       // Verifica se já existe um usuário com o mesmo nome
       const existingUserIndex = users.findIndex(user => user.id === id);
       
       if (existingUserIndex !== -1) {
         // Remove o usuário do array
         users.splice(existingUserIndex, 1);

         // Salva o novo array no armazenamento
         await AsyncStorage.setItem('@users', JSON.stringify(users));

         // Usuário deletado com sucesso
        // console.log('Usuário deletado:', name);
       } else {
         console.log('Usuário não encontrado');
       }
     }  
    
  } catch (error) {
    console.error('Erro ao deletar:', error);
    Alert.alert("Erro ao deletar o usuário!")
  }
}

export const logOut = async () => {  


  try {
    await AsyncStorage.removeItem(`@Logged`);
    await AsyncStorage.removeItem('@FavList');
    return true
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false
  }
}