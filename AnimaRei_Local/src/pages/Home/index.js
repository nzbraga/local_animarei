import React, { useEffect, useContext } from 'react';
import { View, StatusBar } from 'react-native';

import { loadLoginData } from '../../service/local/user';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../UserContext';

import Header from '../../components/Header';
import API from '../../components/API';
import Version from '../../components/Version';

import AsyncStorage from '@react-native-async-storage/async-storage';



import { styles } from './style';


const Home = () => {
  
  const { setUser, setUserImage, setCurrentId, theme, setTheme } = useContext(UserContext);
    
  const navigation = useNavigation();
  
  useEffect(() => {

     handleLogged();

    //apagar local storage pra testes
    //AsyncStorage.clear()

  }, []);

  //verificar se há alguém logado
  const handleLogged = async() => {
        
    
    await loadLoginData().then((res) => {
   //console.log("🚀 ~ loadLoginData ~ res: >>>>>>>", res)
    
      
      if (!res.status) {
        //console.log('handleLogged: ', res.msg)        
        navigation.navigate('Login');
      }
      if (res.status) {
        setUser(res.data.name);
        setUserImage(res.data.image);
        setCurrentId(res.data.id);
        setTheme(res.data.theme)
        //console.log("🚀 ~ awaitloadLoginData ~ theme:", res.data)
        navigation.navigate('Home');
      } 
      
    });

  };

  
  return (
    <View style={styles(theme).container}>
      <StatusBar />
      <Header page='Home' />
      <API />

      <Version />
    </View>
  );
};

export default Home;


