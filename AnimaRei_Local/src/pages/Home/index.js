import React from 'react'
import { View, StatusBar } from 'react-native'

import Header from '../../components/Header'
import API from '../../components/API'

import { styles } from './style'

const Home = () => {
    
  return (
    <View style={styles.container} >
      <StatusBar/>    
      <Header page = 'Home'/>
      <API/>     

    </View>
  )
}

export default Home;