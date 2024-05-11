import { StyleSheet } from "react-native";

import  { colors }  from '../../components/Style/colors'

export default StyleSheet.create({
  container: {   
    backgroundColor: colors.darkPry,
    height:"100%",
    zIndex:-1
  },
  textZap:{
    fontSize:20,
    textAlign:'center',
    color: colors.backSec
  },
  imageZap: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
})

