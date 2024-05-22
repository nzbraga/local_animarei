import { StyleSheet } from 'react-native';
import { getColor } from '../Style/colors'

export const styles = (theme) => StyleSheet.create({
 
  centeredView: {
    flex: 1, 
    alignItems: 'center',
   // backgroundColor: '(rgba(0,0,0,0.9))',
    top: -25,  
  },
  modalView: {
    width: 350,
    backgroundColor: getColor(theme).oppBase,
    margin: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: getColor(theme).base,
    borderWidth: 1,
    padding: 35,
    shadowColor: getColor(theme).base,
    shadowOpacity: 0.5,
    elevation: 30,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    elevation: 20,
    margin:5
  },

  buttonConfirm: {
    backgroundColor: getColor(theme).base,
  },
  buttonClose: {
    backgroundColor: getColor(theme).warn,
  },
  textStyle: {
    color: getColor(theme).oppSec,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  modalText: {
    color: getColor(theme).oppNeut,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },

})