import React, { useEffect, useState } from "react";
import { View, TextInput, Pressable, Text, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";


import styles from "./style";


import AnimeList from "../AnimeList";


function API() {
  
  const api = 'https://api.jikan.moe/v4/anime?q='
  
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = () => {
    if (search === '') {
      Alert.alert('insira o nome de um anime')
    }
    getData();
  };

  const getData = async () => {
    setIsLoading(true)
    if (search) {
      const res = await fetch(`${api}${search}`);
      const { data } = await res.json();
      setData(data);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    getData();
  }, []);

  return (

    <View>

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TextInput style={styles.textInput}
            value={search}
            onChangeText={(v) => setSearch(v)}
            placeholder='Buscar por Anime'
          />
          <Pressable style={styles.button}
            onPress={() => handleSearch()}>
            <Text style={styles.buttonText}>Buscar</Text>
          </Pressable>

        </View>

      </View>
      {data.length === null || data.length === undefined ? <><Text style={{color:'white'}}>oi</Text></>:
      <View style={styles.loading}>
        {isLoading ? <ActivityIndicator size="large" color="green" /> :
          <AnimeList            
            data={data}            
          />
        }
      </View>
  }
    </View>
  )
}

export default API;