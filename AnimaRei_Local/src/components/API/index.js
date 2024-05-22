import React, { useEffect, useState, useContext } from "react";
import { View, TextInput, Pressable, Text, ActivityIndicator, Alert, Linking, Image, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AttNotes from "../AttNotes";

import {styles} from "./style";

import UserContext from '../../pages/UserContext';


import AnimeList from "../AnimeList";


function API() {
  
  const api = 'https://api.jikan.moe/v4/anime?q='
  
  const navigation = useNavigation();

  const { theme } = useContext(UserContext);

  
  const [search, setSearch] = useState('');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false)


  const handleSearch = () => {
      if (search !== '') {      
      getData();
      Keyboard.dismiss()
    }  else {
      setModalText('insira o nome de um anime')
      setModalVisible(true)
    }  
    setData({})   
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

      <View style={styles(theme).container}>
        <View style={styles(theme).textContainer}>
          <TextInput style={styles(theme).textInput}
            value={search}
            onChangeText={(v) => setSearch(v)}
            placeholder='Buscar por Anime'
          />
          <Pressable style={styles(theme).button}
            onPress={() => handleSearch()}>
            <Text style={styles(theme).buttonText}>Buscar</Text>
          </Pressable>

        </View>

      </View>
  
        <View style={styles(theme).loading}>
          {isLoading ? <ActivityIndicator style={{margin:30}} size="large" color="green" /> :
          <>
                {data.length === null || data.length === undefined && <AttNotes/> }
            <AnimeList  data={data} />
          </>}
        </View>

        
      
    </View>
  )
}

export default API;


