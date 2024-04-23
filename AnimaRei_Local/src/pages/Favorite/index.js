import React, {useState, useEffect} from 'react'
import { View, StatusBar } from 'react-native'

import Header from '../../components/Header'
import Favorites from '../../components/Favorites'
import Version from '../../components/Version'

import { styles } from './style'

const Favorite = () => {
  


  
  return (
    <View style={styles.container} >
      <StatusBar />
      <Header page='Favorite'/>
      <Favorites/>
      <Version/>
    </View>
  )
  
}

export default Favorite;