import React from 'react'
import { View, StatusBar } from 'react-native'

import Header from '../../components/Header'
import API from '../../components/API'
import Version from '../../components/Version'

import styles from './style'


const Home = () => {  

  return (
    <View style={styles.container} >
      <StatusBar/>    
      <Header page = 'Home'/>
      <API/>
        
      <Version/>
    </View>
  )
}

export default Home;