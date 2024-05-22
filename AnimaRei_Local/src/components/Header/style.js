import { StyleSheet } from "react-native";
import { getColor } from "../../components/Style/colors";

export const styles = (theme) => StyleSheet.create({
  
  header: {
    flexDirection: 'row', 
    backgroundColor: getColor(theme).base,    
    margin:10,
    borderRadius:15,   
    height: 70,
    width:'95%',
    justifyContent:'space-between',
    //position: 'absolute',
    zIndex:999        
  },  
  logo:{
    width: 35,
    height:35,  
    borderRadius: 50,  
  },
  user: {
    alignItems: 'center',    
    flexDirection: 'row',
    margin:15,
    maxWidth:150
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn:{
    backgroundColor: getColor(theme).base,
    padding:5,
    margin:5,
    borderRadius:30,    
    width:35,
    height:35,
    alignItems: 'center',
    justifyContent: "center",
    alignSelf:"center",
    alignContent:"center"
  },
  btnPlus:{
    backgroundColor: getColor(theme).sec,    
    padding:5,
    margin:5,
    borderRadius:30,
    width:45,
    height:45,
    alignItems: 'center',
    justifyContent: "center",
    alignSelf:"center",
    alignContent:"center"
  },
  headerName: {
    fontSize: 18,     
    fontWeight: 'bold',
    paddingLeft: 5,
    color: getColor(theme).oppBase,
    //maxWidth:150,
    maxHeight:25    
  },
  headerNameBtn: {    
    alignSelf:"center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  themeMenu: {
    position: 'absolute',
    backgroundColor:getColor(theme).base,
    top: 40,
    zIndex:999,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  }
});

