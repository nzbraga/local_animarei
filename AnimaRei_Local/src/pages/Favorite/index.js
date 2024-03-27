import React, {useState, useEffect} from 'react'
import { View, StatusBar } from 'react-native'


import { loadLoginData } from '../../service/local/user'

import Header from '../../components/Header'
import Favorites from '../../components/Favorites'

import { useNavigation } from '@react-navigation/native'


import { styles } from './style'

const Favorite = () => {
  
  const [user, setUser] = useState({})
  
  const navigation = useNavigation()

  //verificar se ha alguem logado
  const handleLogged = async () => {
    await loadLoginData().then((res)=>{
      //console.log("hanleLogged: ",res)
      setUser(res)
    })
  }

  useEffect(() => {  
      handleLogged()
      //AsyncStorage.clear()
  }, [user])

  
  return (
    <View style={styles.container} >
      <StatusBar />
      <Header page='Favorite'/>
      <Favorites user={user}/>
    </View>
  )
  
}

export default Favorite;