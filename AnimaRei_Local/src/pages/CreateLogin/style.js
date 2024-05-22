import { StyleSheet } from "react-native";
import { getColor }  from '../../components/Style/colors'

export const styles = (theme) => StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColor(theme).oppBase,
    colors: getColor(theme).oppNeut,
    zIndex:-1
  },
  title:{
    marginBottom: 14,
    fontSize: 20,
    color: getColor(theme).oppNeut,
    margin:20
  },
  title2:{
    marginTop: 40,
    marginBottom:20,
    fontSize: 20,
    color: getColor(theme).oppNeut,
   
  },
  input:{
    width: '90%',
    height: 45,
    backgroundColor: getColor(theme).oppNeut,
    borderRadius: 4,
    marginBottom: 14,
    padding: 8,
  },
  button:{
    width: '90%',
    height: 45,
    backgroundColor: getColor(theme).base,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:5
  },
  buttonText:{
    fontSize: 20,
    color: getColor(theme).oppBase
  },
  logo:{
    width:40,
    height:40,
  }
  
})

