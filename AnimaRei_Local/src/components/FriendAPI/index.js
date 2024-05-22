import React, { useEffect, useState, useContext } from "react";
import { View, TextInput, Pressable, Text, ActivityIndicator, Alert, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import UserContext from '../../pages/UserContext'
import {styles} from "./style";
import { storageFriendData, loadFriendData } from "../../service/local/friend";
import { findUserByName, findUserById } from '../../service/local/user'

function FriendAPI() {
  const navigation = useNavigation();
  const { currentId, theme } = useContext(UserContext)
  const [search, setSearch] = useState('');
  const [friend, setFriend] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    handleLoadFriendData(currentId)
  }, [])

  async function handleFriendData(friendName) {
    try {
      const res = await findUserByName(friendName);
      setFriend(res);
    } catch (error) {
      console.error("Erro ao buscar amigo:", error);
    }
  }

  function handleAddFriend(userId, friendId) {
    let newFriend = { id: friendId }
    storageFriendData(userId, newFriend)
  }

  async function handleLoadFriendData(id) {
    try {
      const res = await loadFriendData(id);
      setData(res);
    } catch (error) {
      console.error("Erro ao carregar dados do amigo:", error);
      setData([]); // Define os dados como vazios em caso de erro
    }
  }

  return (
    <View>
      <View style={styles(theme).container}>
        <View style={styles(theme).textContainer}>
          <Pressable style={styles(theme).button} onPress={() => handleFriendData(search)}>
            <Text style={styles(theme).buttonText}>Buscar</Text>
          </Pressable>
          <TextInput
            style={styles(theme).textInput}
            value={search}
            onChangeText={(v) => setSearch(v)}
            placeholder='Buscar por um Amigo'
          />
        </View>
      </View>

      <View style={styles(theme).loading}>
        {isLoading ? <ActivityIndicator size="large" color="green" /> :
          <View>
            {friend && (
              <View>
                <Pressable style={styles(theme).button} onPress={() => handleAddFriend(currentId, friend.id)}>
                  <Image
                    style={styles(theme).image}
                    source={friend.image ? { uri: friend.image } : require('../../components/img/icon-anima.jpg')}
                  />
                  <Text>{friend.name} ♥️</Text>
                </Pressable>
              </View>
            )}
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()} // Supondo que cada item tenha uma propriedade 'id' que seja única
              renderItem={({ item }) => (
                <FriendItem id={item.id} />
              )}
            />
          </View>
        }
      </View>
    </View>
  );
}

// Componente separado para renderizar cada item da lista de amigos
function FriendItem({ id }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await findUserById(id);
        setUserData(userData);        
      } catch (error) {
        console.error("Erro ao carregar dados do amigo:", error);
      }
    }

    fetchUserData();

    // Cleanup function
    return () => {
      setUserData(null); // Limpa os dados do usuário ao desmontar o componente
    };
  }, [id]); // Executa o efeito sempre que o ID do amigo mudar

  if (!userData) {
    return null; // Renderiza null se os dados do usuário ainda estiverem sendo carregados
  }

  return (
    <View>
      <Text style={{ color: 'white' }}>{userData.name}</Text>
      <Image
        style={styles(theme).image}
        source={userData.image ? { uri: userData.image } : require('../../components/img/icon-anima.jpg')}
      />
      <Text style={{ color: 'white' }}>{userData.email}</Text>
    </View>
  );
}

export default FriendAPI;
