import React, { useState, useContext } from 'react'
import { View, Pressable, Text, Image} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { logOut, updateUserTheme } from '../../service/local/user';

import UserContext from '../../pages/UserContext';
import ModalConfirm from '../../components/ModalConfirm';

import { styles } from './style';
import { icons } from '../../components/Style/icons';

const Header = ({ page }) => {

  const navigation = useNavigation()

  const { user, currentId, userImage, setUserImage, setTheme, theme } = useContext(UserContext)

  const [menuHide, setMenuHide] = useState(true)
  const [themeHide, setThemeHide] = useState(true)
  
  const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);
  const [modalText, setModalText] = useState('')
  
  function toggleMenu() {
    menuHide ? setMenuHide(false) : setMenuHide(true)
    setThemeHide(false)
  }

  function toggleTheme() {
    themeHide ? setThemeHide(false) : setThemeHide(true)
  }

  function handleModal(){
    setModalText('Deseja Deslogar?')
    setModalVisibleConfirm(true)
  }

  function handleLogOut() {
    navigation.navigate("Login")
    logOut()
    setUserImage('')
    setTheme('')
    toggleMenu()
  }

  function handleUserTheme(userId, theme){    
    updateUserTheme(userId, theme)
  }
  
  //console.log("teste UserContext",user)

  return (

    <>
 <View>

<ModalConfirm modalVisible={modalVisibleConfirm} setModalVisible={setModalVisibleConfirm} modalText={modalText} action={handleLogOut} />
</View>

      <View style={styles(theme).header}>

        <Pressable style={styles(theme).user}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Image
            style={styles(theme).image}
            source={userImage ? { uri: userImage } : require('../../components/img/icon-anima.jpg')}
          />

          <Text style={styles(theme).headerName}>{user}</Text>
        </Pressable>

        {menuHide ?

          <View style={styles(theme).nav}>

            <Pressable
              style={page === 'Home' ? styles(theme).btnPlus : styles(theme).btn}
              onPress={() => navigation.navigate('Home')}>
              <Text>{icons.home}</Text>
            </Pressable>

            <Pressable
              style={page === 'Favorite' ? styles(theme).btnPlus : styles(theme).btn}
              onPress={() => navigation.navigate('Favorite')}>
              <Text>{icons.favorite}</Text>
            </Pressable>

            <Pressable
              style={page === 'Friends' ? styles(theme).btnPlus : styles(theme).btn}
              onPress={() => navigation.navigate('Friends')}>
              <Text>{icons.friends}</Text>
            </Pressable>

            <Pressable
              style={styles(theme).btn}
              onPress={() => toggleMenu()}
            >
              <Text>{icons.config}</Text>
            </Pressable>
          </View>

          :

          <View style={styles(theme).nav}>

            {themeHide &&
              <View style={styles(theme).themeMenu}>

                <Pressable
                  style={styles(theme).btn}
                  onPress={() => {
                    setTheme('green')
                    handleUserTheme(currentId, 'green')
                    setThemeHide(false)
                    //setMenuHide(true)
                  }}
                >
                  <Text>{icons.green}</Text>
                </Pressable>

                <Pressable
                  style={styles(theme).btn}
                  onPress={() => {
                    setTheme('light')
                    handleUserTheme(currentId, 'light')
                    setThemeHide(false)
                    //setMenuHide(true)
                  }}
                >
                  <Text>{icons.light}</Text>
                </Pressable>

                <Pressable
                  style={styles(theme).btn}
                  onPress={() => {
                    setTheme('dark')
                    handleUserTheme(currentId, 'dark')
                    setThemeHide(false)
                    //setMenuHide(true)
                  }}
                >
                  <Text>{icons.dark}</Text>
                </Pressable>

              </View>
            }
            <Pressable
              style={styles(theme).btn}
              onPress={() => toggleTheme()}
            >
              <Text>{icons.theme}</Text>
            </Pressable>
            {/* 
            <Pressable
              style={page === 'Perfil' ? styles(theme).btnPlus : styles(theme).btn}
              onPress={() => {
                navigation.navigate('Perfil')
                setMenuHide(false)               
              }}
            >
              <Text>{icons.perfil}</Text>
            </Pressable>
*/}
            <Pressable
              style={styles(theme).btn}
              onPress={() => handleModal()}
            >
              <Text>{icons.logout}</Text>
            </Pressable>


            <Pressable
              style={styles(theme).btn}
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
