import React from 'react'
import { View, StatusBar } from 'react-native'

import Header from '../../components/Header'
import API from '../../components/API'
import Version from '../../components/Version'

import styles from './style'

const Anime = ({route}) => {
  const animeData = {route}

  console.log(animeData)
  return (
    <View style={styles.container} >
      <StatusBar/>    
      <Header/>
      
        
      <Version/>
    </View>
  )
}

export default Anime;