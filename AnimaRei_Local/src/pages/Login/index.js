import React, { useState,  useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from './style'
import Version from "../../components/Version";

import UserContext from '../UserContext'
import { useNavigation } from '@react-navigation/native'

import { storageLoginData, loadUserData } from "../../service/local/user";
import validationUser from "../../service/validation/login";
import ModalAlert from '../../components/ModalAlert';


const Login = () => {

  const { setUser,  setUserImage, setCurrentId } = useContext(UserContext)

  const navigation = useNavigation()
  
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAlert, setModalAlert] = useState('')


  //logica de login
  const handleLogin = async (name, password) => {
    validationUser(name, password).then((res) => {
      if(!res.status){
        // console.log("handleLogin - valid", res.msg)
        setModalAlert(res.msg)
        setModalVisible(true)
      }    
      
      loadUserData(res.data.name, res.data.password).then((res) => {
         //console.log("handleLogin - load user", res)
        
        if(!res.status){
          //Alert.alert('Usuario ou Senha incorreto')
          setModalAlert(res.msg)
          setModalVisible(true)
        } else {          
         //console.log("handlelogin- res",res)
          setName('')
          setPassword('')

          setUser(res.data.name)
          setUserImage(res.data.image)          
          setCurrentId(res.data.id)          
        
          storageLoginData(res.data.id).then(() => {
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

      <ModalAlert modalVisible={modalVisible} setModalVisible={setModalVisible} modalAlert={modalAlert} />

      <Version />
    </View>
  )
}

export default Login;

/*


  
  

*/