import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'

import styles from './style'

export default function index() {
  return (
   
       <View>

                    <Text style={styles.att}>Notas de Atualização:</Text>
                    <Text style={styles.textAtt}></Text>
                    <Text style={styles.textAtt}> CORREÇÕES:</Text>
                    <Text style={styles.textAtt}>- Correção de deslogar ao voltar tela -</Text>
                    <Text style={styles.textAtt}>- Reorganização do Menu principal -</Text>
                    
          
                    <Text style={styles.textAtt}></Text>
                    <Text style={styles.textAtt}> ADIÇÕES:</Text>
                    <Text style={styles.textAtt}>- Alertas estilizados -</Text>
                    <Text style={styles.textAtt}>- Temas de cores -</Text>
          
                    <Text style={styles.textAtt}></Text>
                    <Text style={styles.textAtt}> -- v 0.0.1.2 --</Text>
                    <Text style={styles.textAtt}></Text>
                    <Text style={styles.textAtt}></Text>
                    <Text style={styles.textAtt}></Text>
          
          
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
          
     
    
    </View>
  )
}