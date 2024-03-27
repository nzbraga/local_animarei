import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { loadFavoriteData, upFavorite } from '../../service/local/favorite';
import * as Progress from 'react-native-progress';

import styles from './style';
import { colors } from '../colors';

const Favorites = ({ user }) => {

  const [lists, setLists] = useState([]);
  
  useEffect(() => {
    if(user){
      const userName = user.name;
      if(lists.length === 0){
        handleFavoriteData(userName);
      }
    }
  }, [user]);

  function handleFavoriteData(name) {
    loadFavoriteData(name).then((res) => {
      if (res) {
        setLists(res.map(item => ({ ...item, hideMenu: false })));
      }
    });
  }

  async function handleUpFavorite(name,id,action){
    await upFavorite(name,id,action).then((res)=>{
      console.log("handleUpFav -- ", res)
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
        keyExtractor={(item, index) => index.toString()}
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
                  onPress={() => {handleUpFavorite(userName,index, 'note') }}>
                  <Text style={styles.buttonText}>📖</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => {handleUpFavorite(userName,index, 'edit') }}>
                  <Text style={styles.buttonText}>✍️</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => {handleUpFavorite(userName,index, 'complite') }}>
                  <Text style={styles.buttonText}>✅</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => {handleUpFavorite(userName,index, 'clear') }}>
                  <Text style={styles.buttonText}>⬜️</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => {handleUpFavorite(userName,index,'delete') }}>
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
              <View style={styles.progressBox}>
              <Pressable style={styles.buttonSide}
                  onPress={() => {handleUpFavorite(userName,index, '-') }}
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
                  onPress={() => {handleUpFavorite(userName,index, '+') }} >
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
