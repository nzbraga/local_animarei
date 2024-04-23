import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './style'
import Version from "../../components/Version";

import UserContext from '../UserContext'
import { useNavigation } from '@react-navigation/native'

import { storageLoginData, loadUserData , loadLoginData} from "../../service/local/user";
import validationUser from "../../service/validation/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {

  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
 
  const navigation = useNavigation()

  //logica de login
  const handleLogin = async (name , password) => {
    validationUser(name, password).then((valid)=>{

      loadUserData(valid.name ,valid.password).then((res)=>{
        //console.log("hanldelogin-",res)
        
        if(valid.password === res.password){
          setUser(name)
          storageLoginData(name).then(()=>{
            navigation.navigate('Home')
          })
        }
      }).catch((error)=>{
        //console.error("Erro ao logar: ", error)
      })
    })
  }

  //verificar se ha alguem logado
  const handleLogged = async () => {
    await loadLoginData().then((res)=>{
      //console.log("hanleLogged: ",res)
      if(res){
        setUser(res.name)
        navigation.navigate('Home')
      }
    })
  }

  useEffect(() => { 
      handleLogged() 
      //apagar local storage pra testes
      //AsyncStorage.clear()
  }, [])

  return (

    <View style={styles.container}>

      <Text style={styles.title}>Seja bem vindo!</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(e) => setName(e)}
        placeholder="Digite seu nome de usuario"
      />

      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry={true}
        onChangeText={(e) => setPassword(e)}
        placeholder="Digite seu password"
      />

      <TouchableOpacity style={styles.button} onPress={() => handleLogin(name, password)}>
        <Text style={styles.buttonText}> Logar </Text>
      </TouchableOpacity>
      <Text style={styles.buttonText}> ou </Text>

      <Text style={styles.title2}> CRIAR LOGIN? </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateLogin')}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
      <Version/>
    </View>
  )
}

export default Login;