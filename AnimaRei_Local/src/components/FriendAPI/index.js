import React, { useEffect, useState } from "react";
import { View, TextInput, Pressable, Text, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FriendList from "../FriendList";

import styles from "./style";
import { allKeys, findFriend } from "../../service/local/friend";



function API() {
  
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  const handleFindFriend = () => {
    if (search === '') {
      Alert.alert('insira o nome do Amigo que quer Buscar')
    }
    getFriendData();
  };

  const getFriendData = async () => {
    setIsLoading(true)
    if (search) {
      const res = await fetch(`${api}${search}`);
      const { data } = await res.json();
      setData(data);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    getFriendData();
  }, []);


  return (

    <View>

      <View style={styles.container}>
         
        <View style={styles.textContainer}>
          <Pressable style={styles.button}
            onPress={() => handleFindFriend(search)}>
            <Text style={styles.buttonText}>Buscar</Text>
          </Pressable>
          <TextInput style={styles.textInput}
            value={search}
            onChangeText={(v) => setSearch(v)}
            placeholder='Buscar por um Amigo'
          />

        </View>

      </View>
         
   
      <View style={styles.loading}>
        {isLoading ? <ActivityIndicator size="large" color="green" /> :
          <FriendList            
            data={data}            
          />
        }
      </View>
      
    </View>
  )
}

export default API;