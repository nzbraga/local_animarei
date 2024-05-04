import React, { useState, useContext } from "react";
import { View, Text, TextInput, Pressable, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native'
import { styles } from "./style";
import Version from "../../components/Version";

import UserContext from "../UserContext";
import { storageUserData, storageLoginData } from "../../service/local/user";
import validationUser from "../../service/validation/user";

export default function CreateLogin() {

  const navigation = useNavigation()

  const { setUser, autoIncrement, setCurrentId } = useContext(UserContext)
  

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  async function handleCreateUser(name, password, passwordConfirm) {
   
    await validationUser(name, password, passwordConfirm).then((res)=>{
      if(res){
        //console.log("handleCreate - user", res)
        let newId = autoIncrement()
        let data = {password: res.password, name, id:newId}
        storageUserData(data).then((res)=>{    
          if(res){
          storageLoginData(newId).then(()=>{          
              setUser(name)
              setCurrentId(newId)
              navigation.navigate('Home')            
          })
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
    <View style={styles.container}>

      <Text style={styles.title}>Seja bem vindo!</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(e) => setName(e)}
        placeholder="Digite seu Nome de Usuario"
      />

      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={(e) => setPassword(e)}
        placeholder="Digite seu password"
      />

      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={passwordConfirm}
        onChangeText={(e) => setPasswordConfirm(e)}
        placeholder="Digite seu password"
      />

      <Pressable style={styles.button} onPress={() => handleCreateUser(name, password, passwordConfirm)}>
        <Text style={styles.buttonText}>Criar</Text>
      </Pressable>

      <Text> ------------------ ou ------------------ </Text>

      <Text style={styles.title}> JA TEM CADASTRO?</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}> Logar </Text>
      </Pressable>
      <Version/>
    </View>
  )
}


