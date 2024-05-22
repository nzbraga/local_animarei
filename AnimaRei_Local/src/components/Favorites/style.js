import { StyleSheet } from "react-native";
import { getColor }  from "../../components/Style/colors";

export const styles = (theme) => StyleSheet.create({
  container: {
  flex: 1,
   marginTop:10 ,
   height:"100%",
   backgroundColor: getColor(theme).oppBase,
   zIndex:-1
   
  }, 
  itemContainer: {
    marginBottom: 15 ,    
    
  }, 
  image: {
    alignSelf: "center",
    width: '95%',
    height: 200,    
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    top:0
  },
  textContainer: {
    alignSelf: "center",
    width: '95%',
    position: "absolute",
    bottom: 0,   
    paddingTop:10,
    paddingBottom:10,
    backgroundColor: '(rgba(0,0,0,0.9))',   
    borderBottomWidth:1,
    borderBottomColor: getColor(theme).base,   
  },  
  titleText:{
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    width: '80%',
    color: getColor(theme).light
  },
  textNote:{
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    width: '80%',
    color: getColor(theme).light
  },
  titleBar:{
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    bottom:15,
    color: getColor(theme).oppBase,
    position:'absolute',
  },
  episodeText: {
    fontSize: 15,
    textAlign: "center",
    color: getColor(theme).neut       
  },
  button: {        
    borderRadius: 25,
    width: 50,
    height:50,            
    marginTop:5,    
    backgroundColor: '(rgba(0,0,0,0.9))',
  },   
  buttonText: {  
    fontSize: 25,
    textAlign:"center",    
    margin:6,
    color: getColor(theme).sec 
  },  
  buttonClose: {  
    marginTop:7,
    fontSize: 24,
    textAlign:"center", 
    color:'red' 
  }, 
  buttonContainer:{
    position: 'absolute',
    alignSelf: "center",
    flexDirection: "row", 
    width:"95%",
    justifyContent:"space-around",       
  },  
  buttonSide: {        
    borderRadius: 25,
    width: 30,
    height:30, 
    margin:5,    
    alignSelf: "center",
    textAlign: "center",             
    backgroundColor: '(rgba(0,0,0,0.9))',
  }, 
  buttonSideText: {  
    fontSize: 20,    
    alignSelf: "center",
    textAlign: "center",    
    color: getColor(theme).light 
  }, 
  hideMenu:{
    position: 'absolute',
    top:5,
    right:15,  
    width: 30,
    height:30,               
    borderRadius: 20,
    backgroundColor: '(rgba(0,0,0,0.9))',
    color: getColor(theme).neut,
    zIndex:2,
  },
  textHideMenu:{   
    fontSize:18,
    alignSelf: "center",
    textAlign: "center", 
    marginTop:2,
    color: getColor(theme).neut
  },
  progressBox:{
    flexDirection: "row", 
    alignSelf: "center",
    height: 30
  },
  progress:{    
    backgroundColor: getColor(theme).sec   
  },
});
