import React, { useEffect, useState } from 'react'
import { View, Pressable, Text, Image, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { loadLoginData, logOut } from '../../service/local/user';

import styles from './style';
 
const Header = ( {page} ) => {

  const navigation = useNavigation()
 
  const [user, setUser] = useState({})


  function handleLogOut(){
    Alert.alert('LogOut','Deseja deslogar?',
      [{ text: 'Yes', onPress: () => 
        {
          logOut()
          navigation.navigate("Login")
        }
      },{ text: 'No' },],
      { cancelable: false }      
    );
   
  }

  async function handleLogged(){
    await loadLoginData().then((res)=>{
      //console.log("header handleLogged: ",res)
      setUser(res)
    })
  }

  useEffect(()=>{ 
      handleLogged()
  }, [user.name])
      

  return (

    <View style={styles.header}>

      <View style={styles.user}>
        
        <Image
          style={styles.image}
          source={require('../img/icon-anima.jpg')}
        />
      
          <Text style={styles.headerName}>{user.name}</Text>
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