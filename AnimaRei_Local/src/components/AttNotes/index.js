import React, {useContext} from 'react'
import { View, Text, Pressable, Image } from 'react-native'

import UserContext from '../../pages/UserContext'

import {styles} from './style'

export default function index() {

  const { theme } = useContext(UserContext);
  
  return (
   
       <View>

                    <Text style={styles(theme).att}>Notas de Atualização:</Text>
                    <Text style={styles(theme).textAtt}></Text>
                    <Text style={styles(theme).textAtt}> CORREÇÕES:</Text>
                    <Text style={styles(theme).textAtt}>- Correção de deslogar ao voltar tela -</Text>
                    <Text style={styles(theme).textAtt}>- Reorganização do Menu principal -</Text>
                    
          
                    <Text style={styles(theme).textAtt}></Text>
                    <Text style={styles(theme).textAtt}> ADIÇÕES:</Text>
                    <Text style={styles(theme).textAtt}>- Alertas estilizados -</Text>
                    <Text style={styles(theme).textAtt}>- Temas de cores -</Text>
          
                    <Text style={styles(theme).textAtt}></Text>
                    <Text style={styles(theme).textAtt}> -- v 0.0.1.2 --</Text>
                    <Text style={styles(theme).textAtt}></Text>
                    <Text style={styles(theme).textAtt}></Text>
                    <Text style={styles(theme).textAtt}></Text>
          
          
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
          
     
    
    </View>
  )
}