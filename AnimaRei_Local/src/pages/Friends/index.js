import React, {useContext} from 'react'
import { View, Text, StatusBar, Pressable, Image, Linking } from 'react-native'

import Header from '../../components/Header'
import Version from '../../components/Version'

import UserContext from '../UserContext'

import {styles} from './style'

const Friends = () => {

  const { theme } = useContext(UserContext);

  return (
    <View style={styles(theme).container} >
      <StatusBar />
      <Header page='Friends' />
      {/*<FriendAPI/>*/}
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text  style={styles(theme).textZap}>...em construção...</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>

      
      <Pressable
            style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}
            onPress={() => Linking.openURL("https://api.whatsapp.com/send?phone=5521997633265")}>

            <Image
              style={styles(theme).imageZap}
              source={require('../../components/img/whatsapp.png')}
            />

            <Text style={styles(theme).textZap}>  Envie seu feedback  </Text>

            <Image
              style={styles(theme).imageZap}
              source={require('../../components/img/whatsapp.png')}
            />

          </Pressable>

  
      <Version/>
    </View>
  )
}

export default Friends;