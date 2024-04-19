import { StyleSheet } from "react-native";

import {colors} from '../../components/colors'

export const styles = StyleSheet.create({
  container: {  
         
    backgroundColor: colors.darkPry,
    height:'100%'
  },
  containerEp: {   
   flexDirection: 'row'
  },
  title:{
    fontSize: 25,
    marginTop: 10,
    alignSelf: "center",
    textAlign: "center",
    width: '80%',
    color: colors.backSec  
  },
  text:{
    color: colors.primary
  },
  button: {
    padding: 8,
    marginVertical:20,
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonText: {
    textAlign:'center',
    color: colors.darkPry,
    fontSize: 16,
  },
  containerInput:{
    marginHorizontal:20,
    marginVertical: 5,
    width:'40%'
  },
  containerInputNote:{
    marginHorizontal:20,
    marginVertical: 5,  
    height: 'auto'  
  },
  input:{
    backgroundColor:colors.backPry,
    color: colors.darkPry,
    paddingHorizontal:10

  }
})

