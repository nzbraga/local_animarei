import { StyleSheet } from 'react-native';

import {colors} from '../../components/colors'

export default StyleSheet.create({

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    alignSelf:"center",
    alignContent:"center",
    backgroundColor: colors.primary,
    padding:20, 
    margin:10,
    borderRadius:15,
    width:"95%",
    height: 70
        
  },  
  user: {
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: 'row',
  },
  logo:{
    width: 35,
    height:35,  
    borderRadius: 50,  
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    alignSelf:"center",
    alignContent:"center"  
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
    color: colors.darkPry
    
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
