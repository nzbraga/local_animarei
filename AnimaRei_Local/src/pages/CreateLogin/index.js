import React, { useState, useContext } from "react";
import { View, Text, TextInput, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native'
import {styles} from "./style";
import Version from "../../components/Version";

import UserContext from "../UserContext";
import { storageUserData, storageLoginData, findUserById } from "../../service/local/user";
import validationUser from "../../service/validation/user";

import ModalAlert from '../../components/ModalAlert';



export default function CreateLogin() {
  
  const navigation = useNavigation()
  
  const { setUser, setCurrentId, theme } = useContext(UserContext)
  
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [modalVisibleAlert, setModalVisibleAlert] = useState(false);
  const [modalAlert, setModalAlert] = useState('')

  async function handleCreateUser(name, password, passwordConfirm) {
   
    await validationUser(name, password, passwordConfirm).then((res)=>{
      if(!res.status){
       // console.log("handleCreate - valid", res.msg)
        setModalAlert(res.msg)
        setModalVisibleAlert(true)
        
      }
      if(res.data){
        console.log("handleCreate - user", res)  
        let data = {password: res.data.password, name: res.data.name}
       // console.log("handleCreate - data", data)       
        storageUserData(data).then((res)=>{  
       // console.log("storage UserData res - ",res)

        if(!res.status){          
          setModalAlert(res.msg)
          setModalVisibleAlert(true)           
        }  
        if(res.status){       
         // console.log("storage UserData res _>  ",res)
          let newId = JSON.stringify(res.data.id)
          //console.log("storage LoginData res -->  ",newId)

          storageLoginData(newId).then((res)=>{                      
           //console.log("storage LoginData res ->  ", res)
           
           findUserById(res.data).then((res)=>{

             setUser(res.data.name)
             setCurrentId(res.data.id)
             navigation.navigate('Home') 

            })
            

          })

          setName('') 
          setPassword('')
          setPasswordConfirm('')   
              
        }      
        }).catch((error)=>{
          console.log("handleCreateUser - stogareUserData". error)
        })      
      }      
    })

  }
  
  //adicionar olhinho da senha oculta ou nao
  //adicionar olhinho da senha oculta ou nao
  //adicionar olhinho da senha oculta ou nao
  
  return (
    <View style={styles(theme).container}>

      <Text style={styles(theme).title}>Seja bem vindo!</Text>

      <TextInput
        style={styles(theme).input}
        value={name}
        onChangeText={(e) => setName(e)}
        placeholder="Digite seu Nome de Usuario"
      />

      <TextInput
        style={styles(theme).input}
        value={email}
        onChangeText={(e) => setEmail(e)}
        placeholder="Digite seu email"
      />

      <TextInput
        style={styles(theme).input}
        secureTextEntry={true}
        value={password}
        onChangeText={(e) => setPassword(e)}
        placeholder="Digite seu password"
      />

      <TextInput
        style={styles(theme).input}
        secureTextEntry={true}
        value={passwordConfirm}
        onChangeText={(e) => setPasswordConfirm(e)}
        placeholder="Digite seu password"
      />

      <Pressable style={styles(theme).button} onPress={() => handleCreateUser(name, password, passwordConfirm)}>
        <Text style={styles(theme).buttonText}>Criar</Text>
      </Pressable>

      <Text> ------------------ ou ------------------ </Text>

      <Text style={styles(theme).title}> JA TEM CADASTRO?</Text>
      <Pressable style={styles(theme).button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles(theme).buttonText}> Logar </Text>
      </Pressable>
      <ModalAlert modalVisible={modalVisibleAlert} setModalVisible={setModalVisibleAlert} modalAlert={modalAlert} />
      <Version/>
    </View>
  )
}
