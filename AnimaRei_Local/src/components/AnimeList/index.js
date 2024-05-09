import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Image, Pressable, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

import UserContext from '../../pages/UserContext'

import { storageFavoriteData } from "../../service/local/favorite";

import styles from "./style";
//import AsyncStorage from "@react-native-async-storage/async-storage";

function AnimeList({ data }) {

  const { user, currentId } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  
  const navigation = useNavigation()

  async function handleAnimeFav(currentId, title, images, episodes) {
   
    //console.log("handleFAv:", currentId)
    const currentEpisode = 0
    const note = ''

    if (episodes === null) {
      episodes = 1
      let favoriteData = { title, images, episodes, note, currentEpisode }

      if (favoriteData) {
        storageFavoriteData(currentId, favoriteData).then(() => {
        
        });
      }
    }

    let favoriteData = { title, images, episodes, note, currentEpisode }

    if (favoriteData) {
      storageFavoriteData(currentId, favoriteData)
    }

  }

  function handleAnimeInfo(anime){
    console.log(anime.url)
    //navigation.navigate('Anime', {anime})
  }

  const renderItem = ({ item }) => (
    <>

      <View style={styles.itemContainer}>

        <Pressable
        onPress={()=> handleAnimeInfo(item)}
        >

        <Image source={{ uri: item.images.jpg.large_image_url }} style={styles.image} />
        </Pressable>

        <View style={styles.textContainer}>

          <Text style={styles.titleText}>
            {item.title}
          </Text>

          {item.episodes > 1 ?
            <>
              <Text style={styles.episodeText}>Episodes: {item.episodes}</Text>
            </>
            :
            <>
              <Text style={styles.episodeText}> OVA / Filme </Text>
            </>}



          <Pressable onPress={() => handleAnimeFav(
            currentId,
            item.title,
            item.images.jpg.large_image_url,
            item.episodes,

          )} style={styles.starContainer}>

            <Text>🤍</Text>
          </Pressable>

        </View>


      </View>

    </>
  );
  return (
    <>    
        <View style={styles.container}>

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
