import { StyleSheet } from 'react-native';

import {colors} from '../../components/colors'

export default StyleSheet.create({

  header: {
    flexDirection: 'row', 
    backgroundColor: colors.primary,    
    margin:10,
    borderRadius:15,   
    height: 70,
    justifyContent:'space-between'
        
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
    alignSelf:"center",
    alignContent:"center" ,
    
  },
  btn:{
    backgroundColor: colors.primary,
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
    backgroundColor: colors.backPry,
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
    color: colors.darkPry,
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
});
