import React, {useContext} from 'react'
import { View, StatusBar } from 'react-native'

import Header from '../../components/Header'
import Favorites from '../../components/Favorites'
import Version from '../../components/Version'

import UserContext from '../UserContext'

import {styles} from './style'

const Favorite = () => {

  const { theme } = useContext(UserContext);
    
  return (
    <View style={styles(theme).container} >
      <StatusBar />
      <Header page='Favorite'/>
      <Favorites/>
      <Version/>
    </View>
  )
  
}

export default Favorite;