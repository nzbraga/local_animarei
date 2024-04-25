import React, { useState, useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";

import UserContext from '../../pages/UserContext'

import styles from "./style";
import { storageFavoriteData } from "../../service/local/friend";
//import AsyncStorage from "@react-native-async-storage/async-storage";

function FriendList({ data }) {

  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)

  function handleFriendData(){
    storageFriendData
  }

  const renderItem = ({ item }) => (
    <View>

          <Text style={styles.titleText}>
            {item.name}
          </Text>

    </View>
  );
  return (
    <>
      {isLoading ? <ActivityIndicator /> :
        <View style={styles.container}>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => (item.id ?? index).toString()}

          />
        </View>
      }
    </>
  );
}

export default FriendList;
