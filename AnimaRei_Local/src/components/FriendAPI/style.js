import { StyleSheet } from 'react-native';

import {colors} from  '../colors'

export default StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      alignSelf:"center",
      alignContent:"center",      
      marginHorizontal:20,
      borderRadius:15,   
      marginBottom:-15  
      
    },
    textContainer:{
      marginHorizontal:"auto",
      flexDirection: 'row',      
    },
    textInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 5,
      fontSize: 16,
      backgroundColor: 'white',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.backSec,
    },
    button: {
      padding: 8,
      marginRight: 10,
      backgroundColor: colors.primary,
      borderRadius: 5,
    },
    buttonText: {
      color: colors.darkPry,
      fontSize: 16,
    },
    loading:{
      margin:20,     
    }
  })