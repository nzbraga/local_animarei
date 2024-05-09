import React, { useState,  useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from './style'
import Version from "../../components/Version";

import UserContext from '../UserContext'
import { useNavigation } from '@react-navigation/native'

import { storageLoginData, loadUserData } from "../../service/local/user";
import validationUser from "../../service/validation/login";


const Login = () => {

  const { setUser,  setUserImage, setCurrentId } = useContext(UserContext)

  const navigation = useNavigation()
  
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')


  //logica de login
  const handleLogin = async (name, password) => {
    validationUser(name, password).then((valid) => {

      
      loadUserData(valid.name, valid.password).then((res) => {
        
        if(!res){
          Alert.alert('Usuario ou Senha incorreto')
        }
        if (res) {          
         // console.log("hanldelogin- res",res)
          setName('')
          setPassword('')

          setUser(res.name)
          setUserImage(res.image)          
          setCurrentId(res.id)          
        
          storageLoginData(res.id).then(() => {
            navigation.navigate('Home')
          })
        }
      }).catch((error) => {
        //console.error("Erro ao logar: ", error)
      })
    })
  }

 

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

      <TouchableOpacity style={styles.button} onPress={() => {
        setName('')
        setPassword('')
        navigation.navigate('CreateLogin')}}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
      <Version />
    </View>
  )
}

export default Login;