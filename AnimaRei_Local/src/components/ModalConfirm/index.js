import React from 'react';
import {Alert, Modal, Text, Pressable, View} from 'react-native';

import styles from './style';

const ModalConfirm = ({ modalVisible, setModalVisible, modalText, action }) => {
  
  function handleConfirm(){
    /* add action confirm*/
    action()  
    setModalVisible(!modalVisible)
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>

            <Pressable
              style={[styles.button]}
              onPress={() =>handleConfirm()}>
              <Text style={styles.textStyle}>Confirmar</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancelar</Text>
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('')
  
<ModalConfirm modalVisible={modalVisible} setModalVisible={setModalVisible} modalText={modalText} />

*/