import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import UserContext from '../../pages/UserContext'
import { loadLoginData } from "../../service/local/user";
import { storageFavoriteData } from "../../service/local/favorite";


import styles from "./style";
//import AsyncStorage from "@react-native-async-storage/async-storage";

function AnimeList({ data }) {
  

  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
 
  async function handleAnimeFav(userName, title, images, episodes) {
    //console.log("handleFAv:", userName)
    const currentEpisode = 0
    const note = ''

    const favoriteData = { title, images, episodes, note, currentEpisode }

    if (favoriteData) {
      storageFavoriteData(userName, favoriteData).then((res) => {
      });
    }

  }
 
  const renderItem = ({ item }) => (
    <>

      <View style={styles.itemContainer}>

        <Image source={{ uri: item.images.jpg.large_image_url }} style={styles.image} />
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



          <TouchableOpacity onPress={() => handleAnimeFav(
            user,
            item.title,
            item.images.jpg.large_image_url,
            item.episodes,

          )} style={styles.starContainer}>
            <Text style={styles.starIcon}>🤍</Text>
          </TouchableOpacity>

        </View>


      </View>

    </>
  );
  return (
    <>
      {isLoading ? <ActivityIndicator /> :
        <View style={styles.container}>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.mal_id.toString()}
          />
        </View>
      }
    </>
  );
}

export default AnimeList;
