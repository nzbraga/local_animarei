import { StyleSheet } from 'react-native';

import  { colors }  from  '../Style/colors'

export default StyleSheet.create({
    
    att:{
    
        fontSize:20,
        marginTop:30,
        textAlign:'center',
        color: colors.backSec,
        zIndex:-1
      },
      textAtt:{
        textAlign:'center',
        color: colors.backSec
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