import React, { useEffect, useState, useContext } from 'react'
import { View, Pressable, Text, Image, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { loadLoginData, logOut } from '../../service/local/user';

import UserContext from '../../pages/UserContext';

import styles from './style';
import { icons } from '../icons';

const Header = ({ page }) => {

  const navigation = useNavigation()

  const { user, userImage , setUserImage, currentId } = useContext(UserContext)
  



  function handleLogOut() {
    Alert.alert('LogOut', 'Deseja deslogar?',
      [{
        text: 'Yes', onPress: () => {
          navigation.navigate("Login")
          logOut()
          setUserImage('')
        }
      }, { text: 'No' },],
      { cancelable: false }
    );

  }

  return (

    <View style={styles.header}>

      <Pressable style={styles.user}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Image
          style={styles.image}
          source={userImage ? { uri: userImage } : require('../../components/img/icon-anima.jpg')}
        />

        <Text style={styles.headerName}>{user}</Text>
      </Pressable>

      <View style={styles.nav}>

        <Pressable
          style={page === 'Home' ? styles.btnPlus : styles.btn}
          onPress={() => navigation.navigate('Home')}>
          <Text>{icons.home}</Text>
        </Pressable>

        <Pressable
          style={page === 'Favorite' ? styles.btnPlus : styles.btn}
          onPress={() => navigation.navigate('Favorite')}>
          <Text>♥️</Text>
        </Pressable>

        <Pressable
          style={page === 'Friends' ? styles.btnPlus : styles.btn}
          onPress={() => navigation.navigate('Friends')}>
          <Text>👥</Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={() => handleLogOut()}
        >
          <Text>🚪</Text>
        </Pressable>

      </View>

    </View>

  )
}

export default Header