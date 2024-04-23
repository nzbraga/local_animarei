import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, Pressable, Alert } from 'react-native';
import * as Progress from 'react-native-progress';

import { loadFavoriteData, upFavorite } from '../../service/local/favorite';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../pages/UserContext';


import styles from './style';
import { colors } from '../colors';

const Favorites = () => {
  
  const navigation = useNavigation()

  const { user, setUser } = useContext(UserContext)
  const [ lists, setLists ] = useState([]);
    
  useEffect(() => {  
    if(lists.length === 0){
      handleFavoriteData(user);
    }
  }, [lists]);

  function handleDetails(id, title, image, note, current, episodes){
    const detailsData = {id, title, image, note, current, episodes, handleFavoriteData}
    navigation.navigate('Details', { detailsData });
  }

  function handleFavoriteData(name) {
    loadFavoriteData(name).then((res) => {
      //console.log("handle fav data",res)
      if (res) {
        setLists(res.map(item => ({ ...item, hideMenu: false })));
      }
    });
  }

  
  function handleDeleteFavoriteData(user, id, action){
    Alert.alert('Excluir','Deseja Remover o anime da lista?',
      [{ text: 'Yes', onPress: () => 
        {
          handleUpFavorite(user,id, action)
        }
      },{ text: 'No' },],
      { cancelable: false }      
    );
   
  }

  async function handleUpFavorite(name,id,action){
    await upFavorite(name,id,action).then((res)=>{
     // console.log("handleUpFav -- ", res)
      handleFavoriteData(name)
    })
  }

  function handleProgress(current, total) {
    const currentNumber = Number(current);
    const totalNumber = Number(total);
    const progress = currentNumber / totalNumber;
    return progress;
  }

  function toggleMenu(index) {
    setLists(prevLists => {
      return prevLists.map((list, i) => {
        if (i === index) {
          return { ...list, hideMenu: !list.hideMenu };
        }
        return list;
      });
    });
  }

  
  return (
    <View style={styles.container}>
      
      <FlatList
        data={lists}
        keyExtractor={(item, index) => (item.id ?? index).toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>

            <Image source={{ uri: item.images }} style={styles.image} />
            {!item.hideMenu ?

              <View style={styles.hideMenu}>                         
               <Pressable onPress={() => toggleMenu(index)}>
                  <Text style={styles.textHideMenu}>☰</Text>
                </Pressable>
              </View> :
             
                <View style={styles.buttonContainer}>
              
            
                <Pressable
                  style={styles.button}
                  onPress={() => {handleDetails(index, item.title, item.images ,item.note,  item.currentEpisode, item.episodes)}}>
                  <Text style={styles.buttonText}>✍️</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => {handleUpFavorite(user,index, 'complite') }}>
                  <Text style={styles.buttonText}>✅</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => {handleUpFavorite(user,index, 'clear') }}>
                  <Text style={styles.buttonText}>⬜️</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => {handleDeleteFavoriteData(user, index, 'delete') }}>
                  <Text style={styles.buttonClose}>X</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => toggleMenu(index)}>
                  <Text style={styles.buttonText}>☰</Text>
                </Pressable>
                
              
              </View>

            }


            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{item.title}</Text>              
              {item.note === '' ? <></>:<Text style={styles.textNote}>Anotação: {item.note}</Text>}
              <View style={styles.progressBox}>
              <Pressable style={styles.buttonSide}
                  onPress={() => {handleUpFavorite(user,index, '-') }}
                >
                  <Text style={styles.buttonSideText}>-</Text>
                </Pressable>

                <Progress.Bar
                  style={styles.progress}
                  progress={handleProgress(item.currentEpisode, item.episodes)}
                  color={colors.primary}
                  height={30}
                  width={300}
                />
                
                <Pressable
                  style={styles.buttonSide}
                  onPress={() => {handleUpFavorite(user,index, '+') }}>
                  <Text style={styles.buttonSideText}>+</Text>
                </Pressable>
              </View>
                <Text style={styles.titleBar}>
                  {item.currentEpisode} / {item.episodes}
                </Text>

            </View>
          </View>
        )}
      />
  
    </View>
  );
};

export default Favorites;
