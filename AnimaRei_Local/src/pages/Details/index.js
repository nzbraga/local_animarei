import React, { useState, useContext } from 'react'
import { View, StatusBar, Text, Image, TextInput, Pressable, ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { loadFavoriteData, upFavorite } from '../../service/local/favorite';


import ModalAlert from '../../components/ModalAlert';
import ModalConfirm from '../../components/ModalConfirm'

import UserContext from '../../pages/UserContext';
import Header from '../../components/Header'
import Version from '../../components/Version';

import { styles } from './style'

const Details = ({ route }) => {

  const navigation = useNavigation()

  const { currentId, theme } = useContext(UserContext)
  const { detailsData } = route.params;

  const { id, title, image, handleFavoriteData } = detailsData;

  const [note, setNote] = useState(detailsData.note)
  const [current, setCurrent] = useState(detailsData.current)
  const [episodes, setEpisodes] = useState(detailsData.episodes)

  const [modalVisibleAlert, setModalVisibleAlert] = useState(false);
  const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);
  const [modalAlert, setModalAlert] = useState('')
  const [modalText, setModalText] = useState('')

  async function handleNewDetails(currentId, id, action, note, current, episodes) {

    upFavorite(currentId, id, action, note, Number(current), Number(episodes)).then((res) => {

      //console.log("🚀 ~ upFavorite ~ res:", res)

      if (!res.status) {
        setModalAlert(res.msg)
        setModalVisibleAlert(true)
      }
      if (res.status) {
        if (res.msg) {
          setModalAlert(res.msg)
          setModalVisibleAlert(true)
        }
      }

      loadFavoriteData(currentId)   
      navigation.replace('Favorite')  
      
    })
   
  }

  return (
    <View style={styles(theme).container}>

      <StatusBar />
      <Header />
      <ScrollView style={styles(theme).scrollView}>


        <Text style={styles(theme).title}>{title}</Text>


        <View style={styles(theme).containerInputNote}>

          <Text style={styles(theme).text}>Anotação:</Text>
          <TextInput
            style={styles(theme).input}
            value={note}
            onChangeText={(e) => setNote(e)}
          />
        </View>
        <View style={styles(theme).containerEp}>

          <View style={styles(theme).containerInput}>

            <Text style={styles(theme).text}>Episodio atual:</Text>
            <TextInput
              style={styles(theme).input}
              keyboardType="numeric"
              value={current.toString()}
              onChangeText={(e) => setCurrent(e)}
            />
          </View>


          <View style={styles(theme).containerInput}>

            <Text style={styles(theme).text}>Episodios:</Text>
            <TextInput
              style={styles(theme).input}
              keyboardType="numeric"
              value={episodes.toString()}
              onChangeText={(e) => setEpisodes(e)}
            />
          </View>
        </View>

        <View style={styles(theme).buttonContainer}>
        <Pressable
          style={styles(theme).button}
          onPress={() => { handleNewDetails(currentId, id, 'edit', note, current, episodes) }}>
          <Text style={styles(theme).buttonText}>Salvar</Text>
        </Pressable>

        <Pressable
          style={styles(theme).buttonBack}
          onPress={() => { navigation.navigate('Favorite') }}>
          <Text style={styles(theme).buttonText}>Voltar</Text>
        </Pressable>

        </View>

        <Image source={{ uri: image }} style={styles(theme).image} />

        <ModalAlert modalVisible={modalVisibleAlert} setModalVisible={setModalVisibleAlert} modalAlert={modalAlert} />
        <ModalConfirm modalVisible={modalVisibleConfirm} setModalVisible={setModalVisibleConfirm} modalText={modalText} action={() => handleModal} />

      </ScrollView>
      <Version />
    </View>
  )
}

export default Details;
