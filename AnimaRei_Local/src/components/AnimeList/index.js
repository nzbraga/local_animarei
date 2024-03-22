import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { loadUserData } from "../../service/local/user";
import { storageFavoriteData } from "../../service/local/favorite";

import styles from "./style";

function AnimeList({ data }) {

  const navigation = useNavigation()

  const [user, setUser] = useState({})  
  const [isLoading, setIsLoading] = useState(false)

  async function handleLoginData() {
    const newUser = await loadUserData();
    setUser(newUser);
  }



  async function handleAnimeFav(title, images, description, userId, episodes, token) {

    const res = await createFavorite(title, images, description, userId, episodes, token)
    const favoriteData = res.favorite

    if (favoriteData) {
      storageFavoriteData(favoriteData)
    }
    if (res.error) {
      Alert.alert(res.error)
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
              <Text> OVA / Filme </Text>
            </>}



          <TouchableOpacity onPress={() => handleAnimeFav(
            item.title,
            item.images.jpg.large_image_url,
            item.synopsis,
            user.id,
            item.episodes,
            user.token

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
