import React from 'react'
import { View, Text, StatusBar } from 'react-native'

import Header from '../../components/Header'
import FriendAPI from '../../components/FriendAPI'
import Version from '../../components/Version'

import { styles } from './style'

const Friends = () => {

  return (
    <View style={styles.container} >
      <StatusBar />
      <Header page='Friends' />
      <FriendAPI/>
      <Version/>
    </View>
  )
}

export default Friends;