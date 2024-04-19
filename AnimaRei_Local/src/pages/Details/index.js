import React, { useState, useContext } from 'react'
import { View, StatusBar, Text, Image, TextInput,Alert, Pressable, ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { upFavorite } from '../../service/local/favorite';

import UserContext from '../../pages/UserContext';
import Header from '../../components/Header'


import { styles } from './style'

const Details = ({ route }) => {

  const navigation = useNavigation()

  const { user, setUser } = useContext(UserContext)
  const { detailsData } = route.params;
  const { id, title, image } = detailsData;

  const [note, setNote] = useState(detailsData.note)
  const [current, setCurrent] = useState(detailsData.current)
  const [episodes, setEpisodes] = useState(detailsData.episodes)
  

  function handleNewDetails(user, id, action, note, current, episodes) {
    upFavorite(user, id, action, note, current, episodes).then(() => {
      Alert.alert('Atualizado com sucesso!')
      navigation.navigate('Home')
    })
  }
 

  return (
    <ScrollView style={styles.container}>    

    <View>
      <StatusBar />
      <Header />
      <View style={styles.container}>

        <Image source={{ uri: image }} style={{ width: 400, height: 300 }} />
        <Text style={styles.title}>{title}</Text>


        <View style={styles.containerInputNote}>

        <Text style={styles.text}>Anotação:</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={(e) => setNote(e)}
          />
        </View>
        <View style={styles.containerEp}>

        <View style={styles.containerInput}>

        <Text style={styles.text}>Episodio atual:</Text>
        <TextInput
          style={styles.input}
          value={current.toString()}          
          onChangeText={(e) => setCurrent(e)}
          />
        </View>
        

        <View style={styles.containerInput}>

        <Text style={styles.text}>Episodios:</Text>
        <TextInput
          style={styles.input}
          value={episodes.toString()}          
          onChangeText={(e) => setEpisodes(e)}
          />
        </View>
          </View>
        

        <Pressable 
        style={styles.button}
        onPress={() => { handleNewDetails(user, id, 'note', note, current, episodes) }}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
       
      </View>
    </View>
    </ScrollView>
  );
}

export default Details;