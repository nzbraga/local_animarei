import React, { useState, useContext } from 'react'
import { View, StatusBar, Text, Image, TextInput,Alert, Pressable, ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { upFavorite } from '../../service/local/favorite';

import UserContext from '../../pages/UserContext';
import Header from '../../components/Header'
import Version from '../../components/Version';

import { styles } from './style'

const Details = ({ route }) => {

  const navigation = useNavigation()

  const { user, setUser } = useContext(UserContext)
  const { detailsData } = route.params;  
 
  const { id, title, image, handleFavoriteData } = detailsData;

  const [note, setNote] = useState(detailsData.note)
  const [current, setCurrent] = useState(detailsData.current)
  const [episodes, setEpisodes] = useState(detailsData.episodes)
  

  function handleNewDetails(user, id, action, note, current, episodes) {

    upFavorite(user, id, action, note, Number(current), Number(episodes)).then(() => {      
      handleFavoriteData(user)     
      navigation.navigate('Favorite')
    })
  }
 

  return (
    
      <View style={styles.container}>
   
      <StatusBar />
      <Header />
      <ScrollView style={styles.scrollView}>    

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
          keyboardType="numeric"
          value={current.toString()}          
          onChangeText={(e) => setCurrent(e)}
          />
        </View>
        

        <View style={styles.containerInput}>

        <Text style={styles.text}>Episodios:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={episodes.toString()}          
          onChangeText={(e) => setEpisodes(e)}
          />
        </View>
          </View>
        

        <Pressable 
        style={styles.button}
        onPress={() => { handleNewDetails(user, id, 'edit', note, current, episodes) }}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
       
    </ScrollView>
    <Version/>
    
    </View>
  );
}

export default Details;