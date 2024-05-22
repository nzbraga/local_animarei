import React, { useState, useContext } from 'react'
import { View, StatusBar, Text, Image, TextInput, Alert, Pressable, ScrollView, Keyboard } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import {
  deleteUser, loadUserData, updateUserNameById,
  updateUserPasswordById, updateUserImageById
} from '../../service/local/user';

import { removeFavList } from '../../service/local/favorite';
import validationLogin from '../../service/validation/login'
import validationNewUser from '../../service/validation/newUser'
import validationPassword from '../../service/validation/password'

import UserContext from '../UserContext';
import Header from '../../components/Header'
import Version from '../../components/Version';

import ModalAlert from '../../components/ModalAlert';

import { useNavigation } from '@react-navigation/native';

import { styles } from './style'
import ModalConfirm from '../../components/ModalConfirm';

const Perfil = () => {

  const navigation = useNavigation()

  const { user, setUser, userImage, setUserImage, currentId, theme } = useContext(UserContext)

  const [newUser, setNewUser] = useState(user)
  const [password, setPassword] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [hideNewSenha, setHideSenha] = useState(true)
  const [image, setImage] = useState(userImage);

  const [modalVisibleAlert, setModalVisibleAlert] = useState(false);
  const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);

  const [infoData, setInfoData] = useState({})
  const [modalAlert, setModalAlert] = useState('')
  const [modalText, setModalText] = useState('')


  function handlePickImage(name, password) {
    console.log("🚀 ~ handlePickImage ~ name:", name)

    loadUserData(name, password).then((res) => {
      console.log("🚀 ~ loadUserData ~ res:", res)
      if (res) {
        pickImage()
      }
      setPassword('')
    })


  }
  const saveImage = async (userId, uri) => {

    updateUserImageById(userId, uri).then((res) => {
      console.log("🚀 ~ updateUserImageById ~ res:", res)

      if (res) {

        Alert.warn('Atualizado com sucesso!')
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
  function handleModal() {
    setModalText(`Deseja Remover Usuario
e sua lista de favoritos?
Não será possivel recuperar essas informações!`)
    setModalVisibleConfirm(true)
  }
  function handleDeleteUser(name, password) {

    validationLogin(name, password).then((res) => {
      //console.log("🚀 ~ validationLogin ~ res:", res)
      if (!res.status) {
        setModalAlert(res.msg)
        setModalVisibleAlert(true)
      }
      
      loadUserData(name, password).then((res) => {
        if (!res.status) {
          setModalAlert(res.msg)
          setModalVisibleAlert(true)
        }
        if (res.status) {
          removeFavList(res.data.id)
          deleteUser(res.data.id).then(() => {
          navigation.navigate('Login')
          })
        }

      })


    })

  }
  function handleNewUserName(user, newUser, password) {
    // validar inputs
    validationNewUser(user, newUser, password).then((res) => {
      // console.log("🚀 ~ validationNewUser ~ res:", res)
      if (!res.status) {
        setModalAlert(res.msg)
        setModalVisibleAlert(true)
        return
      }

      if (res.status) {
        //confirmar senha e atualizar nome
        loadUserData(user, password).then((res) => {
          console.log("🚀Perfil ~ loadUserData ~ res:", res)
          if (!res.status) {
            setModalAlert(res.msg)
            setModalVisibleAlert(true)
            return
          }

          updateUserNameById(res.data.id, newUser).then((res) => {
            console.log("🚀 ~ updateUserNameById ~ res:---", res)

            if (res.status) {
              setUser(newUser)
              setPassword('')
              setModalAlert(res.msg)
              setModalVisibleAlert(true)
            }

          })

        })
      }

    })
  }
  function handleNewPassword(user, password, newPassword, confirmPassword) {

    // validar inputs
    validationPassword(user, newPassword, confirmPassword).then((res) => {
      console.log("🚀 ~ validationPassword ~ res:", res)
      if (!res.status) {
        setModalAlert(res.msg)
        setModalVisibleAlert(true)
        return
      }

      if (res.status) {
        //confirmar senha e atualizar senha
        loadUserData(user, password).then((res) => {
          console.log("🚀handlePass ~ loadUserData ~ res:", res)
          if (!res.status) {
            setModalAlert(res.msg)
            setModalVisibleAlert(true)
            return
          }

          updateUserPasswordById(res.data.id, newPassword).then((res) => {
            console.log("🚀 ~ updateUserPasswordById ~ res:", res)

            if (res.status) {
              setModalAlert(res.msg)
              setModalVisibleAlert(true)
            }

          })
        })
      }


    })
  }

  return (

    <View style={styles(theme).container}>
      <StatusBar />
      <Header page='Perfil' />
      <ScrollView style={styles(theme).scrollView}>
        {!hideNewSenha ? '' :
          <View>
            <Pressable onPress={() => handlePickImage(user, password)}>
              <Image
                style={styles(theme).image}
                source={image ? { uri: image } : require('../../components/img/icon-anima.jpg')}
              />
            </Pressable>
            <Text style={styles(theme).text}>Nome de Usuario</Text>
            <TextInput
              style={styles(theme).input}
              value={newUser}
              onChangeText={(e) => setNewUser(e)}
            />
            <Text style={styles(theme).text}>Senha:</Text>
            <TextInput
              style={styles(theme).input}
              secureTextEntry={true}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
            <View style={styles(theme).containerInput}>
              <Pressable

                style={styles(theme).button}
                onPress={() => handleNewUserName(user, newUser, password)}
              >

                <Text>
                  Alterar Nome
                </Text>
              </Pressable>

              <Pressable

                style={styles(theme).buttonRed}
                onPress={() => handleModal()}
              >

                <Text>
                  Excluir Usuario
                </Text>
              </Pressable>

              <Pressable

                style={styles(theme).button}
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
            <Text style={styles(theme).text}>Senha Atual:</Text>
            <TextInput
              style={styles(theme).input}
              secureTextEntry={true}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
            <Text style={styles(theme).text}>Nova Senha:</Text>
            <TextInput
              style={styles(theme).input}
              secureTextEntry={true}
              value={newPassword}
              onChangeText={(e) => setNewPassword(e)}
            />
            <Text style={styles(theme).text}>Confirmar Nova Senha:</Text>
            <TextInput
              style={styles(theme).input}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(e) => setConfirmPassword(e)}
            />
            <View style={styles(theme).containerInput}>

              <Pressable
                style={styles(theme).button}
                onPress={() => handleNewPassword(user, password, newPassword, confirmPassword)}
              >
                <Text>
                  Salvar
                </Text>
              </Pressable>
              <Pressable
                style={styles(theme).button}
                onPress={() => setHideSenha(true)}
              >
                <Text>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </>
        }
        <ModalAlert modalVisible={modalVisibleAlert} setModalVisible={setModalVisibleAlert} modalAlert={modalAlert} />
        <ModalConfirm modalVisible={modalVisibleConfirm} setModalVisible={setModalVisibleConfirm} modalText={modalText} action={() => handleDeleteUser(user, password)} infoData={infoData} />

      </ScrollView>
      <Version />
    </View>


  );
}

export default Perfil;