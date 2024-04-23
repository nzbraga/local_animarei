import React, { useState, useContext } from 'react'
import { View, StatusBar, Text, Image, TextInput, Alert, Pressable, ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { deleteUser, storageUserData, storageLoginData, loadUserData } from '../../service/local/user';
import { loadFavoriteData, removeFavList, storageFavoriteData } from '../../service/local/favorite';
import validationUser  from '../../service/validation/newUser'
import validationPassword  from '../../service/validation/password'
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserContext from '../UserContext';
import Header from '../../components/Header'

import { styles } from './style'
import Version from '../../components/Version';

const Details = ({ route }) => {

  const navigation = useNavigation()

  const { user, setUser } = useContext(UserContext)
  const [newUser, setNewUser] = useState(user)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [hideNewSenha, setHideSenha] = useState(true)

  //console.log('Perfil user: ',user)

  async function  handleNewUserName(user, newUser, password) {
   await validationUser(newUser, password).then((valid)=>{
   //console.log("valid", valid)
   if(valid){   
    deleteUser(user, password).then((res) => {
      if (res) {
        storageUserData(newUser, password).then((res) => {
          if (res) {
            storageLoginData(newUser).then(()=>{            
              setUser(newUser)
              loadFavoriteData(user).then((newFavList)=>{              
                const favoriteList = Array.isArray(newFavList) ? newFavList[0] : newFavList;
                removeFavList(user);
                storageFavoriteData(newUser, favoriteList).then(()=>{
                  setPassword('')
                })
                Alert.alert("Atualizado com sucesso!");              
              })
            })
          }
        })
      }
    })
  }
  })
  }

  function handleNewPassword(user, password, newPassword, confirmPassword){
  
    validationPassword(user, newPassword, confirmPassword).then((valid)=>{
          
      loadUserData(user , password).then((res)=>{
      
        const pass = { password: valid.password }   
        const newPass = JSON.stringify(pass);
        AsyncStorage.setItem(`@${user}`, newPass).then(()=>{
          setPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setHideSenha(true)
        })
        Alert.alert("Atualizado com Sucusso!")
        navigation.navigate('Perfil')

      })})
  }
    
  return (
    
    <View style={styles.container}>
      <StatusBar />
          <Header />
        <ScrollView style={styles.scrollView}>
        {!hideNewSenha ? '' :
          <View>
            <Text style={styles.text}>Nome de Usuario</Text>
            <TextInput
              style={styles.input}
              value={newUser}
              onChangeText={(e) => setNewUser(e)}
            />
            <Text style={styles.text}>Senha:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
            <View style={styles.containerInput}>
              <Pressable

                style={styles.button}
                onPress={() => handleNewUserName(user, newUser, password)}
              >

                <Text>
                  Alterar Nome
                </Text>
              </Pressable>
              <Pressable

                style={styles.buttonRed}
                onPress={() => setHideSenha(false)}
              >

                <Text>
                  Excluir Usuario
                </Text>
              </Pressable>
              <Pressable

                style={styles.button}
                onPress={() => setHideSenha(false)}
              >

                <Text>
                  Alterar Senha
                </Text>
              </Pressable>
            </View>
          </View>
        }


        {hideNewSenha ? '' :
          <>
            <Text style={styles.text}>Senha Atual:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
            <Text style={styles.text}>Nova Senha:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={newPassword}
              onChangeText={(e) => setNewPassword(e)}
            />
            <Text style={styles.text}>Confirmar Nova Senha:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(e) => setConfirmPassword(e)}
            />
            <View style={styles.containerInput}>

              <Pressable
                style={styles.button}
                onPress={() => handleNewPassword(user, password, newPassword, confirmPassword)}
              >
                <Text>
                  Salvar
                </Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => setHideSenha(true)}
              >
                <Text>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </>
        }

    </ScrollView>
      <Version/>
      </View>
      
    
  );
}

export default Details;