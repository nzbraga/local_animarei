import { StyleSheet } from "react-native";

import  { colors }  from '../../components/Style/colors'

export default StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkPry,
    colors: colors.light,
    zIndex:-1
  },
  title:{
    marginBottom: 14,
    fontSize: 20,
    color: colors.light,
    margin:20
  },
  title2:{
    marginTop: 40,
    marginBottom:20,
    fontSize: 20,
    color: colors.light,
   
  },
  input:{
    width: '90%',
    height: 45,
    backgroundColor: colors.light,
    borderRadius: 4,
    marginBottom: 14,
    padding: 8,
  },
  button:{
    width: '90%',
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:5
  },
  buttonText:{
    fontSize: 20,
    color: colors.darkPry
  },
  logo:{
    width:40,
    height:40,
  }
  
})

