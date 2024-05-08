import React, { useEffect, useState } from "react";
import { View, TextInput, Pressable, Text, ActivityIndicator, Alert, Linking, Image, Keyboard } from "react-native";
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
      if (search !== '') {      
      getData();
      Keyboard.dismiss()
    }  else {
      Alert.alert('insira o nome de um anime')
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
  
        <View style={styles.loading}>
          {isLoading ? <ActivityIndicator style={{margin:30}} size="large" color="green" /> :
          <>
                {data.length === null || data.length === undefined &&
                  <>
                    <Text style={styles.att}>Notas de Atualização:</Text>
                    <Text style={styles.textAtt}></Text>
                    <Text style={styles.textAtt}> CORREÇÕES:</Text>
                    <Text style={styles.textAtt}>- Sistema de Login refaturado -</Text>
                    <Text style={styles.textAtt}>- Correção de bugs nos favoritos -</Text>
          
                    <Text style={styles.textAtt}></Text>
                    <Text style={styles.textAtt}> ADIÇÕES:</Text>
                    <Text style={styles.textAtt}>- Opção de Personalizar foto de usuario -</Text>
          
                    <Text style={styles.textAtt}></Text>
                    <Text style={styles.textAtt}> -- v 0.0.1.1 --</Text>
                    <Text style={styles.textAtt}></Text>
                    <Text style={styles.textAtt}></Text>
                    <Text style={styles.textAtt}></Text>
          
          
                    <Pressable
                      style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}
                      onPress={() => Linking.openURL("https://api.whatsapp.com/send?phone=5521997633265")}>
          
                      <Image
                        style={styles.imageZap}
                        source={require('../../components/img/whatsapp.png')}
                      />
          
                      <Text style={styles.textZap}>  Envie seu feedback  </Text>
          
                      <Image
                        style={styles.imageZap}
                        source={require('../../components/img/whatsapp.png')}
                      />
          
                    </Pressable>
          
                  </> }
            <AnimeList
              data={data}
            />
          </>}
        </View>
      
    </View>
  )
}

export default API;