import { StyleSheet } from 'react-native';
import  { colors }  from '../Style/colors'

export default StyleSheet.create({
    centeredView: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',             
        backgroundColor: '(rgba(0,0,0,0.7))', 
        top: -25, 
        position: 'absolute'

      },
      modalView: {
        width:350,
        backgroundColor:colors.darkPry,      
        margin: 20,
        //backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: colors.primary,
        borderWidth:1,
        padding: 35,       
        shadowColor: colors.primary,      
        shadowOpacity: 0.5,      
        elevation: 30,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 15,
        elevation: 20,
        backgroundColor: colors.primary,
        color: colors.darkPry,
        margin:10
      },
      
      buttonClose: {
        backgroundColor: colors.alert,
      },
      textStyle: {
        color: colors.light,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:20
      },
      modalText: {
        color: colors.light,        
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:20
      },

})