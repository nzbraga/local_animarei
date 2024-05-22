import React, {useContext} from 'react';
import { Modal, Text, Pressable, View} from 'react-native';

import UserContext from '../../pages/UserContext'

import {styles} from './style';

const ModalConfirm = ({ modalVisible, setModalVisible, modalText, action }) => {

  const {theme} = useContext(UserContext)

  function handleConfirm(){  
    action()      
    setModalVisible(!modalVisible)   
  }

  return (
    <View style={styles(theme).centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {        
          setModalVisible(!modalVisible);
        }}>
        <View style={styles(theme).centeredView}>
          <View style={styles(theme).modalView}>
            <Text style={styles(theme).modalText}>{modalText}</Text>

            <Pressable
              style={[styles(theme).button, styles(theme).buttonConfirm]}
              onPress={() =>handleConfirm()}>
              <Text style={styles(theme).textStyle}>Confirmar</Text>
            </Pressable>

            <Pressable
              style={[styles(theme).button, styles(theme).buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles(theme).textStyle}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
 
    </View>
  );
};

export default ModalConfirm;


/*
import ModalConfirm from '../../components/ModalConfirm';

  const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);
  const [modalText, setModalText] = useState('')
  
<ModalConfirm modalVisible={modalVisible} setModalVisible={setModalVisible} modalText={modalText} action={} />
*/