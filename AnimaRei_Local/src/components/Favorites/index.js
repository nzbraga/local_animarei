import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'

import { loadUserData } from '../../service/local/user'

import { styles } from './style'

const Favorites = () => {
  const [user, setUser] = useState({});
  const [lists, setLists] = useState([]);

  async function handleFavoriteData(userId){
    try {
      const res = await listFavorites(userId);
      setLists(res);
    } catch (error) {
      console.error('Error ao buscar favorites:', error);
      // Você pode exibir uma mensagem de erro para o usuário aqui
    }
  }
  
  async function handleLoginData(){
    try {
      const newUser = await loadUserData();     
      setUser(newUser);    
    } catch (error) {
      console.error('Error ao buscar user data:', error);
      // Você pode exibir uma mensagem de erro para o usuário aqui
    }
  }
  
  useEffect(() => {  
    if(!user.name){        
      handleLoginData();             
    }    
  }, [user])

  useEffect(() => {            
    if(user.id) {
      handleFavoriteData(user.id);
    }
  }, [user.id])

  // Renderizar o item da lista
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
      {/* Outros dados do item */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={lists}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Favorites;
