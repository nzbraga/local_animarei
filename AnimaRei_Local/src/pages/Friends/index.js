import React from 'react'
import { View, Text, StatusBar, Pressable, Image, Linking } from 'react-native'

import Header from '../../components/Header'
import FriendAPI from '../../components/FriendAPI'
import Version from '../../components/Version'

import styles from './style'

const Friends = () => {

  return (
    <View style={styles.container} >
      <StatusBar />
      <Header page='Friends' />
      {/*<FriendAPI/>*/}
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text  style={styles.textZap}>...em construção...</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>

      
      <Pressable
            style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}
            onPress={() => Linking.openURL("https://api.whatsapp.com/send?phone=5521997633265")}>

            <Image
              style={styles.imageZap}
              source={require('../../components/img/whatsapp.png')}
            />

            <Text style={styles.textZap}>  Envie seu feedback  </Text>

            <Image
              style={styles.imageZap}
              source={require('../../components/img/whatsapp.png')}
            />

          </Pressable>

  
      <Version/>
    </View>
  )
}

export default Friends;