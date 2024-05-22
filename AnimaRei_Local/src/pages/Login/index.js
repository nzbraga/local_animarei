import React, { useState, useContext } from "react";
import { View, Text, TextInput, Pressable } from 'react-native';

import { styles } from './style'
import Version from "../../components/Version";

import UserContext from '../UserContext'
import { useNavigation } from '@react-navigation/native'

import { storageLoginData, loadUserData, findUserById } from "../../service/local/user";
import validationUser from "../../service/validation/login";
import ModalAlert from '../../components/ModalAlert';


const Login = () => {

  const { setUser, setUserImage, setCurrentId, theme, setTheme } = useContext(UserContext)

  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [modalVisibleAlert, setModalVisibleAlert] = useState(false);
  const [modalAlert, setModalAlert] = useState('')


  //logica de login
  const handleLogin = async (name, password) => {
    if (name === '') {
      setModalAlert("Digite seu nome de Usuario")
      setModalVisibleAlert(true)
      return
    }
    if (password === '') {
      setModalAlert("Digite sua senha")
      setModalVisibleAlert(true)
      return
    }
    validationUser(name, password).then((res) => {
      if (!res.status) {
        //console.log("handleLogin - valid", res.msg)
        setModalAlert(res.msg)
        setModalVisibleAlert(true)
      }

      loadUserData(res.data.name, res.data.password).then((res) => {
        //console.log("handleLogin - load user--", res)

        if (!res.status) {
          setModalAlert(res.msg)
          setModalVisibleAlert(true)
        }
        if (res.status) {
          //console.log("handlelogin- res",res)
          setName('')
          setPassword('')

          let newId = JSON.stringify(res.data.id)
          //console.log("storage LoginData res -->  ",newId)

          storageLoginData(newId).then((res) => {
            //console.log("storage LoginData res ->  ", res)
            findUserById(res.data).then((res) => {

              setUser(res.data.name)
              setUserImage(res.data.image)
              setCurrentId(res.data.id)
              setTheme(res.data.theme)

            })
            navigation.navigate('Home')
          })
        }
      }).catch((error) => {
        //console.error("Erro ao logar: ", error)
      })
    })
  }

  return (

    <View style={styles(theme).container}>

      <Text style={styles(theme).title}>Seja bem vindo!</Text>

      <TextInput
        style={styles(theme).input}
        value={name}
        onChangeText={(e) => setName(e)}
        placeholder="Digite seu nome de usuario"
      />

      <TextInput
        style={styles(theme).input}
        value={password}
        secureTextEntry={true}
        onChangeText={(e) => setPassword(e)}
        placeholder="Digite seu password"
      />

      <Pressable style={styles(theme).button} onPress={() => handleLogin(name, password)}>
        <Text style={styles(theme).buttonText}> Logar </Text>
      </Pressable>
      <Text style={styles(theme).buttonText}> ou </Text>

      <Text style={styles(theme).title2}> CRIAR LOGIN? </Text>

      <Pressable style={styles(theme).button} onPress={() => {
        setName('')
        setPassword('')
        navigation.navigate('CreateLogin')
      }}>
        <Text style={styles(theme).buttonText}>Criar</Text>
      </Pressable>

      <Pressable>
        <Text style={styles().title}>esqueci minha senha</Text>
      </Pressable>

      <ModalAlert modalVisible={modalVisibleAlert} setModalVisible={setModalVisibleAlert} modalAlert={modalAlert} />

      <Version />
    </View>
  )
}

export default Login;

/*


  
  

*/