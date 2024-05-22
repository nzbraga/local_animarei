import { StyleSheet } from "react-native";
import { getColor }  from '../../components/Style/colors'

export const styles = (theme) => StyleSheet.create({
  container: { 
    flex:1,
   
    backgroundColor: getColor(theme).oppBase, 
    justifyContent: 'flex-end',  
    zIndex:-1
    
  },
  scrollView:{
    flex:1,
    backgroundColor: getColor(theme).oppBase, 
    
  },
  containerEp: {   
   flexDirection: 'row'
  },
  image:{
    width: 350,
    height: 500,
    alignSelf:'center'

  },
    title:{
    fontSize: 25,
    marginTop: 10,
    alignSelf: "center",
    textAlign: "center",
    width: '80%',
    color: getColor(theme).neut  
  },
  text:{
    color: getColor(theme).base
  },
  button: {
    padding: 8,
    marginVertical:20,
    marginHorizontal: 20,
    backgroundColor: getColor(theme).base,
    borderRadius: 5,
    width:150,
  },
  buttonBack: {
    padding: 8,
    marginVertical:20,
    marginHorizontal: 20,
    backgroundColor: getColor(theme).warn,
    borderRadius: 5,
    width:150,
  },
  buttonText: {
    textAlign:'center',
    color: getColor(theme).oppBase,
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
    backgroundColor: getColor(theme).sec,
    color: getColor(theme).oppBase,
    paddingHorizontal:10

  },
  buttonContainer:{
    flexDirection:"row",
    justifyContent:'space-around'
  }
})

