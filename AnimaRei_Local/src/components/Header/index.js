import React, { useEffect, useState, useContext } from 'react'
import { View, Pressable, Text, Image, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { logOut } from '../../service/local/user';

import UserContext from '../../pages/UserContext';
import ModalConfirm from '../../components/ModalConfirm';

import styles from './style';
import { icons } from '../../components/Style/icons';

const Header = ({ page }) => {

  const navigation = useNavigation()

  const { user, userImage, setUserImage, setTheme } = useContext(UserContext)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('Deseja Deslogar?')
  const [menuHide, setMenuHide] = useState(true)
  const [themeHide, setThemeHide] = useState(true)

  function toggleMenu() {
    menuHide ? setMenuHide(false) : setMenuHide(true)
    setThemeHide(false)
  }

  function toggleTheme() {
    themeHide ? setThemeHide(false) : setThemeHide(true)
  }

  function handleLogOut() {
    navigation.navigate("Login")
    logOut()
    setUserImage('')
    toggleMenu()
  }

  return (

    <>
      <ModalConfirm modalVisible={modalVisible} setModalVisible={setModalVisible} modalText={modalText} action={handleLogOut} />

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

        {menuHide ?
          <View style={styles.nav}>

            <Pressable
              style={page === 'Home' ? styles.btnPlus : styles.btn}
              onPress={() => navigation.navigate('Home')}>
              <Text>{icons.home}</Text>
            </Pressable>

            <Pressable
              style={page === 'Favorite' ? styles.btnPlus : styles.btn}
              onPress={() => navigation.navigate('Favorite')}>
              <Text>{icons.favorite}</Text>
            </Pressable>

            <Pressable
              style={page === 'Friends' ? styles.btnPlus : styles.btn}
              onPress={() => navigation.navigate('Friends')}>
              <Text>{icons.friends}</Text>
            </Pressable>
            <Pressable
              style={styles.btn}
              onPress={() => toggleMenu()}
            >
              <Text>{icons.config}</Text>
            </Pressable>
          </View>
          :
          <View style={styles.nav}>

            { themeHide &&
            <View style={styles.themeMenu}>

            <Pressable
              style={styles.btn}
              onPress={() => setTheme('green')}
              >
              <Text>{icons.green}</Text>
            </Pressable>

            <Pressable
              style={styles.btn}
              onPress={() => setTheme('light')}
              >
              <Text>{icons.light}</Text>
            </Pressable>

            <Pressable
              style={styles.btn}
              onPress={() => setTheme('dark')}
              >
              <Text>{icons.dark}</Text>
            </Pressable>

            </View>
}
            <Pressable
              style={styles.btn}
              onPress={() => toggleTheme()}
              >
              <Text>{icons.theme}</Text>
            </Pressable>

            <Pressable
              style={styles.btn}
              onPress={() => navigation.navigate('Perfil')}
            >
              <Text>{icons.perfil}</Text>
            </Pressable>

            <Pressable
              style={styles.btn}
              onPress={() => setModalVisible(true)}
            >
              <Text>{icons.logout}</Text>
            </Pressable>


            <Pressable
              style={styles.btn}
              onPress={() => toggleMenu()}
            >
              <Text>{icons.config}</Text>
            </Pressable>
          </View>
        }




      </View>

    </>
  )
}

export default Header

/*


  


*/