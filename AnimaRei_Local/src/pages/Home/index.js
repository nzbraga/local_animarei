import React, { useEffect, useContext, useState } from 'react';
import { View, StatusBar,Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loadLoginData } from '../../service/local/user';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../UserContext';

import Header from '../../components/Header';
import API from '../../components/API';
import Version from '../../components/Version';
import Modalapp from '../../components/ModalTeste';


import style from './style'; 

const Home = () => {
  const { setUser, setUserImage, setCurrentId, theme } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    handleLogged();

    //apagar local storage pra testes
    //AsyncStorage.clear()

  }, []);

  //verificar se há alguém logado
  const handleLogged = async () => {
    await loadLoginData().then((res) => {
      if (res) {
        setUser(res.name);
        setUserImage(res.image);
        setCurrentId(res.id);
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    });
  };

  return (
    <View style={style.container}> 
      <StatusBar/>
      <Header page='Home'/>
      <Pressable onPress={()=>setModalVisible(true)}>
        <Text style={{color:'white'}}>MODDAAAAL</Text>
        </Pressable>    
      <API/>
      <Modalapp modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <Version/>
    </View>
  );
};

export default Home;


