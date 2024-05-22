import { StyleSheet } from 'react-native';
import { getColor }  from  '../../components/Style/colors'

export const styles = (theme) => StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      alignSelf:"center",
      alignContent:"center",      
      marginHorizontal:20,
      borderRadius:15,   
      marginBottom:-15,
      zIndex:-1  
      
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
      borderColor: getColor(theme).neut,
    },
    button: {
      padding: 8,
      marginRight: 10,
      backgroundColor: getColor(theme).base,
      borderRadius: 5,
    },
    buttonText: {
      color: getColor(theme).oppBase,
      fontSize: 16,
    },
    loading:{
      margin:20,     
    },
    image: {
      width: 100,
      height : 100,
      borderRadius: 50,   
      alignSelf:'center'
    },
    
  })