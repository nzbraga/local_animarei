import React from 'react'
import { View, StatusBar } from 'react-native'

import Header from '../../components/Header'
import Favorites from '../../components/Favorites'

import { styles } from './style'

const Favorite = () => {

  return (
    <View style={styles.container} >
      <StatusBar />
      <Header page='Favorite'/>
      <Favorites/>
    </View>
  )
  
}

export default Favorite;