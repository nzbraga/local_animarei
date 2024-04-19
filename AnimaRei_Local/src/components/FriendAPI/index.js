import React, { useEffect, useState } from "react";
import { View, TextInput, Pressable, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";


import styles from "./style";



function API() {
  
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false)


  return (

    <View>

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Pressable style={styles.button}
            onPress={() => handleSearch()}>
            <Text style={styles.buttonText}>Buscar</Text>
          </Pressable>
          <TextInput style={styles.textInput}
            value={search}
            onChangeText={(v) => setSearch(v)}
            placeholder='Buscar por um Amigo'
          />

        </View>

      </View>
          <Text style={{color:'white', margin:30, fontSize:40, textAlign:'center'}}> EM BREVE! </Text>
   { /*
      <View style={styles.loading}>
        {isLoading ? <ActivityIndicator size="large" color="green" /> :
          <FriendList            
            data={data}            
          />
        }
      </View>
      */}
    </View>
  )
}

export default API;