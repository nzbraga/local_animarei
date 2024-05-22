import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import * as Progress from 'react-native-progress';

import { loadFavoriteData, upFavorite } from '../../service/local/favorite';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../pages/UserContext';

import ModalConfirm from '../ModalConfirm';
import ModalAlert from '../../components/ModalAlert';

import { styles } from './style';
import { getColor } from '../Style/colors';

import { icons } from '../../components/Style/icons';

const Favorites = () => {

  const navigation = useNavigation()

  const { currentId, theme } = useContext(UserContext)
  const [lists, setLists] = useState([]);

 
  const [modalArgument, setModalArgument] = useState(false);
  const [modalVisibleAlert, setModalVisibleAlert] = useState(false);
  const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);
  const [modalAlert, setModalAlert] = useState('')
  const [modalText, setModalText] = useState('')
  const [modalId, setModalId] = useState('')
  const [modalAction, setModalAction] = useState('')
  
 
  useEffect(() => {
    handleFavoriteData(currentId);

  }, []);
  function handleDetails(id, title, image, note, current, episodes) {
    navigation.navigate('Details', {
      detailsData: {
        id, title, image, note, current, episodes
      }
      
    });
  }
  function handleFavoriteData(currentId) {
    loadFavoriteData(currentId).then((res) => {
      //console.log("handle fav data",res)
      if (res.status) {
        setLists(res.data.map(item => ({ ...item, hideMenu: false })));
      }
    });
  } 
  function handleDeleteFavoriteData( id, action) {
  
    setModalId(id)
    setModalAction(action)
    setModalText('Deseja remover da lista?')
    setModalVisibleConfirm(true)
    
  }
  async function handleUpFavorite(currentId, id, action) {

    await upFavorite(currentId, id, action).then((res) => {
      
      if (!res.status) {
        setModalAlert(res.msg)
        setModalVisibleAlert(true)
      }
      if (res.status) {
        if(res.msg){
          setModalAlert(res.msg)
          setModalVisibleAlert(true)
        }
      }
    })

    handleFavoriteData(currentId)
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
    <>

      <View style={styles(theme).container}>
        {lists.length === 0 ?
          <>
            <Text style={styles(theme).titleText}> Adicione animes aos Favoritos clicando no  🤍</Text>
            <Text style={styles(theme).titleText}> e eles apareceram aqui</Text>
          </>
          :
          <>

            <FlatList
              data={lists}
              keyExtractor={(item, index) => (item.id ?? index).toString()}
              renderItem={({ item, index }) => (
                <View style={styles(theme).itemContainer}>

                  <Image source={{ uri: item.images }} style={styles(theme).image} />
                  {!item.hideMenu ?

                    <View style={styles(theme).hideMenu}>
                      <Pressable onPress={() => toggleMenu(index)}>
                        <Text style={styles(theme).textHideMenu}>{icons.menu}</Text>
                      </Pressable>
                    </View> :

                    <View style={styles(theme).buttonContainer}>


                      <Pressable
                        style={styles(theme).button}
                        onPress={() => { handleDetails(index, item.title, item.images, item.note, item.currentEpisode, item.episodes) }}>
                        <Text style={styles(theme).buttonText}>{icons.edit}</Text>
                      </Pressable>

                      <Pressable
                        style={styles(theme).button}
                        onPress={() => { handleUpFavorite(currentId, index, 'complite') }}>
                        <Text style={styles(theme).buttonText}>{icons.complite}</Text>
                      </Pressable>

                      <Pressable
                        style={styles(theme).button}
                        onPress={() => { handleUpFavorite(currentId, index, 'clear') }}>
                        <Text style={styles(theme).buttonText}>{icons.clear}</Text>
                      </Pressable>

                      <Pressable
                        style={styles(theme).button}
                        onPress={() => { handleDeleteFavoriteData(index, 'delete') }}>
                        <Text style={styles(theme).buttonClose}>{icons.delete}</Text>
                      </Pressable>

                      <Pressable
                        style={styles(theme).button}
                        onPress={() => toggleMenu(index)}>
                        <Text style={styles(theme).buttonText}>{icons.menu}</Text>
                      </Pressable>


                    </View>

                  }


                  <View style={styles(theme).textContainer}>
                    <Text style={styles(theme).titleText}>{item.title}</Text>
                    {item.note && <Text style={styles(theme).textNote}>Anotação: {item.note}</Text>}
                    <View style={styles(theme).progressBox}>
                      <Pressable style={styles(theme).buttonSide}
                        onPress={() => { handleUpFavorite(currentId, index, '-') }}
                      >
                        <Text style={styles(theme).buttonSideText}>{icons.backward}</Text>
                      </Pressable>

                      <Progress.Bar
                        style={styles(theme).progress}
                        progress={handleProgress(item.currentEpisode, item.episodes)}
                        color={getColor(theme).base}
                        height={30}
                        width={300}
                      />

                      <Pressable
                        style={styles(theme).buttonSide}
                        onPress={() => { handleUpFavorite(currentId, index, '+') }}>
                        <Text style={styles(theme).buttonSideText}>{icons.forward}</Text>
                      </Pressable>
                    </View>
                    <Text style={styles(theme).titleBar}>
                      {item.currentEpisode} / {item.episodes}
                    </Text>

                  </View>
                </View>
              )}
            />
            <ModalAlert modalVisible={modalVisibleAlert} setModalVisible={setModalVisibleAlert} modalAlert={modalAlert} />        
            <ModalConfirm modalVisible={modalVisibleConfirm} setModalVisible={setModalVisibleConfirm} modalText={modalText} action={()=> handleUpFavorite(currentId, modalId, modalAction)} />
          </>
        }
      </View>
    </>
  );
};

export default Favorites;
