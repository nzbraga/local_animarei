import React, { useState, useContext } from 'react'
import { View, StatusBar, Text, Image, TextInput, Alert, Pressable, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import { deleteUser, loadUserData, updateUserNameById,
updateUserPasswordById, updateUserImageById } from '../../service/local/user';

import { allKeys, removeFavList} from '../../service/local/favorite';
import validationNewUser from '../../service/validation/newUser'
import validationLogin from '../../service/validation/login'
import validationPassword from '../../service/validation/password'

import UserContext from '../UserContext';
import Header from '../../components/Header'
import Version from '../../components/Version';

import { useNavigation } from '@react-navigation/native';

import { styles } from './style'

const Details = ({ route }) => {

  const navigation = useNavigation()

  const { user, setUser, userImage, setUserImage, currentId } = useContext(UserContext)
  
  const [newUser, setNewUser] = useState(user)
  const [password, setPassword] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [hideNewSenha, setHideSenha] = useState(true)
  const [image, setImage] = useState(userImage);
  

  function handlePickImage(name, password){ 

      loadUserData(name, password).then((res) => {
        if (res) {
          pickImage()
        }
      setPassword('')  
      })
    
      
  }

  const saveImage = async (userId, uri) => {
  
    updateUserImageById(userId, uri).then((res)=>{
      if(res){
       
        Alert.alert('Atualizado com sucesso!')
      }
    }) 
    
  }     

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    //console.log("result pickImage",result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      saveImage(currentId, result.assets[0].uri)
      setUserImage(result.assets[0].uri)
    }
  }

  function handleDeleteUser(name, password) {

    Alert.alert('Excluir Usuario?', `Deseja Remover Usuario e sua lista de favoritos? Não será possivel recuperar essas informações!`,
      [{
        text: 'Yes', onPress: () => {
          validationLogin(name, password).then(()=>{

            loadUserData(name, password).then((res) => {
              if (res) {
                removeFavList(res.id)
                deleteUser(res.id).then(() => {
                  navigation.navigate('Login')
                })
              }
              
            })
          })
        }
      }, { text: 'No' },],
      { cancelable: false }
    );

  }

 function handleNewUserName(user, newUser, password) {
       // validar inputs
    validationNewUser(user, newUser, password).then((valid) => {           
        if (valid) {
          //confirmar senha e atualizar nome
          loadUserData(user, valid.password).then((res)=>{          
            updateUserNameById(res.id, newUser).then((res)=>{
              if(res){
                setUser(newUser)
                Alert.alert('Atualizado com sucesso!')
              }
            })
          })
        }
      
    })
  }

  function handleNewPassword(user, password, newPassword, confirmPassword ) {
       // validar inputs
       validationPassword(user, newPassword, confirmPassword).then((valid) => {           
        if (valid) {
          //confirmar senha e atualizar senha
          loadUserData(user, password).then((res)=>{     
            console.log("handleNewPass", res)     
            updateUserPasswordById(res.id, newPassword).then((res)=>{              
              if(res){                
                Alert.alert('Atualizado com sucesso!')
              }
            })
          })
        }
      
    })
  }
 
  return (

    <View style={styles.container}>
      <StatusBar />
      <Header />
      <ScrollView style={styles.scrollView}>
        {!hideNewSenha ? '' :
          <View>
            <Pressable onPress={() => handlePickImage(user, password)}>
              <Image
                style={styles.image}
                source={image ? { uri: image } : require('../../components/img/icon-anima.jpg')}
              />
            </Pressable>
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
                onPress={() => handleDeleteUser(user, password)}
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
      <Version />
    </View>


  );
}

export default Details;