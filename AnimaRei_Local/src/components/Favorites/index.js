import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, Pressable, Alert } from 'react-native';
import * as Progress from 'react-native-progress';

import { loadFavoriteData, upFavorite } from '../../service/local/favorite';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../pages/UserContext';


import styles from './style';
import  { colors }  from '../../components/Style/colors';
import { icons } from '../../components/Style/icons';

const Favorites = () => {
  
  const navigation = useNavigation()

  const { user, currentId} = useContext(UserContext)
  const [ lists, setLists ] = useState([]);
    
  useEffect(() => {  
    if(lists.length === 0){
      handleFavoriteData(currentId);
    }
  }, []);

  function handleDetails(id, title, image, note, current, episodes){
    const detailsData = {id, title, image, note, current, episodes, handleFavoriteData}
    navigation.navigate('Details', { detailsData });
  }

  function handleFavoriteData(currentId) {
    loadFavoriteData(currentId).then((res) => {
      //console.log("handle fav data",res)
      if (res) {
        setLists(res.map(item => ({ ...item, hideMenu: false })));
      }
    });
  }

  
  function handleDeleteFavoriteData(currentId, id, action){
    Alert.alert('Excluir','Deseja Remover o anime da lista?',
      [{ text: 'Yes', onPress: () => 
        {
          handleUpFavorite(currentId,id, action)
        }
      },{ text: 'No' },],
      { cancelable: false }      
    );
   
  }

  async function handleUpFavorite(currentId,id,action){
    await upFavorite(currentId,id,action).then((res)=>{
     // console.log("handleUpFav -- ", res)
      handleFavoriteData(currentId)
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
      {lists.length === 0 ? 
      <>
      <Text style={styles.titleText}> Adicione animes aos Favoritos clicando no  🤍</Text>
      <Text style={styles.titleText}> e eles apareceram aqui</Text>
      </>
      :
      <FlatList
        data={lists}
        keyExtractor={(item, index) => (item.id ?? index).toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>

            <Image source={{ uri: item.images }} style={styles.image} />
            {!item.hideMenu ?

              <View style={styles.hideMenu}>                         
               <Pressable onPress={() => toggleMenu(index)}>
                  <Text style={styles.textHideMenu}>{icons.menu}</Text>
                </Pressable>
              </View> :
             
                <View style={styles.buttonContainer}>
              
            
                <Pressable
                  style={styles.button}
                  onPress={() => {handleDetails(index, item.title, item.images ,item.note,  item.currentEpisode, item.episodes)}}>
                  <Text style={styles.buttonText}>{icons.edit}</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => {handleUpFavorite(currentId,index, 'complite') }}>
                  <Text style={styles.buttonText}>{icons.complite}</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => {handleUpFavorite(currentId,index, 'clear') }}>
                  <Text style={styles.buttonText}>{icons.clear}</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => {handleDeleteFavoriteData(currentId, index, 'delete') }}>
                  <Text style={styles.buttonClose}>{icons.delete}</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => toggleMenu(index)}>
                  <Text style={styles.buttonText}>{icons.menu}</Text>
                </Pressable>
                
              
              </View>

            }


            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{item.title}</Text>              
              {item.note && <Text style={styles.textNote}>Anotação: {item.note}</Text>}
              <View style={styles.progressBox}>
              <Pressable style={styles.buttonSide}
                  onPress={() => {handleUpFavorite(currentId,index, '-') }}
                >
                  <Text style={styles.buttonSideText}>{icons.backward}</Text>
                </Pressable>

                <Progress.Bar
                  style={styles.progress}
                  progress={handleProgress(item.currentEpisode, item.episodes)}
                  color={ colors.primary}
                  height={30}
                  width={300}
                />
                
                <Pressable
                  style={styles.buttonSide}
                  onPress={() => {handleUpFavorite(currentId,index, '+') }}>
                  <Text style={styles.buttonSideText}>{icons.forward}</Text>
                </Pressable>
              </View>
                <Text style={styles.titleBar}>
                  {item.currentEpisode} / {item.episodes}
                </Text>

            </View>
          </View>
        )}
      />
      }
    </View>
  );
};

export default Favorites;
