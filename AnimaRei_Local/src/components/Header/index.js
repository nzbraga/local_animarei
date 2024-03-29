import React, { useEffect, useState, useContext } from 'react'
import { View, Pressable, Text, Image, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { loadLoginData, logOut } from '../../service/local/user';

import UserContext from '../../pages/UserContext';

import styles from './style';
 
const Header = ( {page} ) => {

  const navigation = useNavigation()
 
  const { user } = useContext(UserContext)


  function handleLogOut(){
    Alert.alert('LogOut','Deseja deslogar?',
      [{ text: 'Yes', onPress: () => 
        {
          navigation.navigate("Login")
          logOut()
        }
      },{ text: 'No' },],
      { cancelable: false }      
    );
   
  }


  return (

    <View style={styles.header}>

      <View style={styles.user}>
        
        <Image
          style={styles.image}
          source={require('../img/icon-anima.jpg')}
        />
      
          <Text style={styles.headerName}>{user}</Text>
      </View>

      <View style={styles.nav}>

        <Pressable
         style={page === 'Home' ?   styles.btnPlus : styles.btn}
          onPress={() => navigation.navigate('Home')}>
          <Text>🏠</Text>
        </Pressable>

        <Pressable
           style={page === 'Favorite' ?   styles.btnPlus : styles.btn}
          onPress={() => navigation.navigate('Favorite')}>
          <Text>♥️</Text>
        </Pressable>

        <Pressable
           style={page === 'Friends' ?   styles.btnPlus : styles.btn}
          onPress={() => navigation.navigate('Friends')}>
          <Text>👥</Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={()=> handleLogOut()} 
          >
          <Text>🚪</Text>
        </Pressable>

      </View>

    </View>

  )
}

export default Header