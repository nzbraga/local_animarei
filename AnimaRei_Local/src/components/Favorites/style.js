import { StyleSheet } from "react-native";

import {colors} from '../../components/colors'

export const styles = StyleSheet.create({
  container: {   
    backgroundColor: colors.darkPry,
    height:"100%"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  listItemContainer:{
    padding:10,
    margin:10,
    borderRadius: 80,
    backgroundColor: "#127935",
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',  
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  synopsisText: {
    fontSize: 10,       
  }, 
  episodeText: {
    fontSize: 16,    
    textAlign:'center',
    margin:10
  },
  button: {        
    borderRadius: 25,
    width: 50,
    height:30,            
    margin:"auto",    
    backgroundColor: "#65945F",  
  }, 
  buttonText: {  
    fontSize: 24,
    textAlign:"center",  
  }, 
  buttonContainer:{
    flexDirection: "row", 
    justifyContent:"space-around",
    margin:10   
  }
});

export default styles;
