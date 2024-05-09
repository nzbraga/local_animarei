import { StyleSheet } from "react-native";
import  { colors }  from "../Style/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.backSec,
    
  },
  itemContainer: {
    backgroundColor: colors.darkPry,
    paddingVertical: 10,     
  },
  image: {
    alignSelf: "center",    
    width: '100%',
    height: 420,    
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    top:0
  },
  textContainer: {
    alignSelf: "center",
    width: '100%',
    position: "absolute",
    bottom: 0,   
    paddingTop:10,
    paddingBottom:10,
    backgroundColor: '(rgba(0,0,0,0.7))',   
    borderBottomWidth:3,
    borderBottomColor: colors.primary
  },  
  titleText:{
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    width: '80%',
    color: colors.backSec
  },
  episodeText: {
    fontSize: 15,
    textAlign: "center",
    color: colors.backSec
       
  },
  starContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  starIcon: {
    fontSize:90,
    color:'white'
  },
});
