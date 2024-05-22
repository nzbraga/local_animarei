import React, {useContext} from 'react';
import { Modal, Text, Pressable, View} from 'react-native';

import UserContext from '../../pages/UserContext';

import {styles} from './style';

const ModalAlert = ({ modalVisible, setModalVisible, modalAlert }) => {
  
  const {theme} = useContext(UserContext)

  
  return (
    <View style={styles(theme).centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {        
          setModalVisible(!modalVisible);
        }}>
        <View style={styles(theme).centeredView}>
          <View style={styles(theme).modalView}>
            <Text style={styles(theme).modalText}>{modalAlert}</Text>
            <Pressable
              style={[styles(theme).button, styles(theme).buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles(theme).textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
 
    </View>
  );
};

export default ModalAlert;


/*
import ModalAlert from '../../components/ModalAlert';

  const [modalVisibleAlert, setModalVisibleAlert] = useState(false);
  const [modalAlert, setModalAlert] = useState('')
  
<ModalAlert modalVisible={modalVisibleAlert} setModalVisible={setModalVisibleAlert} modalAlert={modalAlert} />

*/