import React from 'react';
import { Modal, Text, Pressable, View} from 'react-native';

import styles from './style';

const ModalAlert = ({ modalVisible, setModalVisible, modalAlert }) => {
  

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalAlert}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Fechar</Text>
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAlert, setModalAlert] = useState('')
  
<ModalAlert modalVisible={modalVisible} setModalVisible={setModalVisible} modalAlert={modalAlert} />

*/