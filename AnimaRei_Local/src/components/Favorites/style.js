import { StyleSheet } from "react-native";
import { colors } from "../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
   marginTop:10 ,
   height:"100%"
   
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
    backgroundColor: '(rgba(0,0,0,0.6))',   
    borderBottomWidth:1,
    borderBottomColor: colors.primary,   
  },  
  titleText:{
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    width: '80%',
    color: colors.backSec
  },
  textNote:{
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    width: '80%',
    color: colors.backSec
  },
  titleBar:{
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    bottom:15,
    color: colors.darkPry,
    position:'absolute',
  },
  episodeText: {
    fontSize: 15,
    textAlign: "center",
    color: colors.backSec       
  },
  button: {        
    borderRadius: 25,
    width: 50,
    height:50,            
    marginTop:5,    
    backgroundColor: '(rgba(0,0,0,0.7))',
  },   
  buttonText: {  
    fontSize: 25,
    textAlign:"center",    
    margin:6,
    color: colors.backPry 
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
    backgroundColor: '(rgba(0,0,0,0.7))',
  }, 
  buttonSideText: {  
    fontSize: 20,    
    alignSelf: "center",
    textAlign: "center",    
    color: colors.backPry 
  }, 
  hideMenu:{
    position: 'absolute',
    top:5,
    right:15,  
    width: 30,
    height:30,               
    borderRadius: 20,
    backgroundColor: '(rgba(0,0,0,0.8))',
    color:colors.backSec,
    zIndex:2,
  },
  textHideMenu:{   
    fontSize:18,
    alignSelf: "center",
    textAlign: "center", 
    marginTop:2,
    color:colors.backSec
  },
  progressBox:{
    flexDirection: "row", 
    alignSelf: "center",
    height: 30
  },
  progress:{    
    backgroundColor: colors.backPry   
  },
});
