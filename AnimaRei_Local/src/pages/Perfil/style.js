import {  StyleSheet } from "react-native";

import  { colors }  from '../Style/colors'

export default StyleSheet.create({
  container: { 
    flex:1,
   
    backgroundColor: colors.darkPry, 
    justifyContent: 'flex-end',  
    
  },
  scrollView:{
    flex:1,
    backgroundColor: colors.darkPry, 
    
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
    marginHorizontal:10,
    color: colors.primary
  },
  button: {
    padding: 8,
    marginVertical:20,
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonRed: {
    padding: 8,
    marginVertical:20,
    marginHorizontal: 20,
    backgroundColor: colors.alert,
    borderRadius: 5,
  },
  buttonText: {
    textAlign:'center',
    color: colors.darkPry,
    fontSize: 16,
  },
  containerInput:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginHorizontal:20,
    marginVertical: 5,
    
  },
  containerInputNote:{
    marginHorizontal:20,
    marginVertical: 5,  
    height: 'auto'  
  },
  input:{
    backgroundColor: colors.backPry,
    color: colors.darkPry,
    paddingHorizontal:10,
    margin:10

  },
  image: {
    width: 180,
    height :180,
    borderRadius: 20,   
    alignSelf:'center'
  },
})

