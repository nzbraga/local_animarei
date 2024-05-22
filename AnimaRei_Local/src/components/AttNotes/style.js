import { StyleSheet } from 'react-native';

import { getColor }  from  '../Style/colors'

export const styles = (theme) => StyleSheet.create({
    
    att:{
        fontSize:20,
        marginTop:30,
        textAlign:'center',
        color: getColor(theme).base,
        zIndex:-1
      },
      textAtt:{
        textAlign:'center',
        color: getColor(theme).base
      },
      textZap:{
        fontSize:20,
        textAlign:'center',
        color: getColor(theme).base
      },
      imageZap: {
        width: 30,
        height: 30,
        borderRadius: 20,
      },
})