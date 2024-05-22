import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import {styles} from './style';

import UserContext from '../../pages/UserContext';

const Version = () => {

  const { theme } = useContext(UserContext);

  return (
    <View style={styles(theme).container}>
      
    <Text style={styles(theme).text}>version 0.0.1.1</Text>
    </View>
  )
}

export default Version