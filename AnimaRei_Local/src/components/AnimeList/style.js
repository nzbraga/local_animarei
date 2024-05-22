import { StyleSheet } from "react-native";
import { getColor }  from "../Style/colors";

export const styles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: getColor(theme).neut,
    zIndex:-1
    
  },
  itemContainer: {
    backgroundColor: getColor(theme).oppBase,
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
    backgroundColor: '(rgba(0,0,0,0.9))',   
    borderBottomWidth:3,
    borderBottomColor: getColor(theme).base
  },  
  titleText:{
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    width: '80%',
    color: getColor(theme).light
  },
  episodeText: {
    fontSize: 15,
    textAlign: "center",
    color: getColor(theme).light
       
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
