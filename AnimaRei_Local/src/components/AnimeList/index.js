import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

import UserContext from '../../pages/UserContext'
import ModalAlert from '../../components/ModalAlert';
import { storageFavoriteData } from "../../service/local/favorite";

import {styles} from "./style";

//import AsyncStorage from "@react-native-async-storage/async-storage";

function AnimeList({ data }) {

  const { currentId, theme } = useContext(UserContext)
  const [modalVisibleAlert, setModalVisibleAlert] = useState(false);
  const [modalAlert, setModalAlert] = useState('')
  
  const navigation = useNavigation()

  async function handleAnimeFav(currentId, title, images, episodes) {
       
   const currentEpisode = 0
   
    const note = ''

    if (episodes === null) {
      episodes = 1
      let favoriteData = { title, images, episodes, note, currentEpisode }

      //console.log("🚀 ~ handleAnimeFav ~ favoriteData:", favoriteData)
      if (favoriteData) {
        storageFavoriteData(currentId, favoriteData).then((res) => {
        //console.log(res)
        setModalAlert(res.msg)
        setModalVisibleAlert(true)
        });
      }
    }

    let favoriteData = { title, images, episodes, note, currentEpisode }

    //console.log("🚀 ~ handleAnimeFav ~ favoriteData:", favoriteData)
    if (favoriteData) {
      storageFavoriteData(currentId, favoriteData).then((res) => {
        //console.log(res)
        setModalAlert(res.msg)
        setModalVisibleAlert(true)
        });

    }

  }

  function handleAnimeInfo(anime){
    console.log("AnimeInfo",anime.url)
    //navigation.navigate('Anime', {anime})
  }

  const renderItem = ({ item }) => (
    <>

      <View style={styles(theme).itemContainer}>

        <Pressable
        onPress={()=> handleAnimeInfo(item)}
        >

        <Image source={{ uri: item.images.jpg.large_image_url }} style={styles(theme).image} />
        </Pressable>

        <View style={styles(theme).textContainer}>

          <Text style={styles(theme).titleText}>
            {item.title}
          </Text>

          {item.episodes > 1 ?
            <>
              <Text style={styles(theme).episodeText}>Episodes: {item.episodes}</Text>
            </>
            :
            <>
              <Text style={styles(theme).episodeText}> OVA / Filme </Text>
            </>}



          <Pressable onPress={() => handleAnimeFav(
            currentId,
            item.title,
            item.images.jpg.large_image_url,
            item.episodes,

          )} style={styles(theme).starContainer}>

            <Text>🤍</Text>
          </Pressable>

        </View>


      </View>

    </>
  );
  return (
    <>    
        <ModalAlert modalVisible={modalVisibleAlert} setModalVisible={setModalVisibleAlert} modalAlert={modalAlert} />
        <View style={styles(theme).container}>
          
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => (item.id ?? index).toString()}
          />
          
        </View>
      
    </>
  );
}

export default AnimeList;

/*


 
  


*/