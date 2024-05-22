import React, {useContext} from 'react'
import { View, StatusBar } from 'react-native'

import Header from '../../components/Header'
import Version from '../../components/Version'

import UserContext from '../UserContext'

import {styles} from './style'

const Anime = ({route}) => {
  const animeData = {route}

  const { theme } = useContext(UserContext);

  console.log(animeData)
  return (
    <View style={styles(theme).container} >
      <StatusBar/>    
      <Header/>
      
        
      <Version/>
    </View>
  )
}

export default Anime;