import { StyleSheet } from "react-native";
import { getColor }  from '../../components/Style/colors'

export const styles = (theme) => StyleSheet.create({
  container: {   
    backgroundColor: getColor(theme).oppBase,
    height:"100%",
    zIndex:-1
  },
  textZap:{
    fontSize:20,
    textAlign:'center',
    color: getColor(theme).neut
  },
  imageZap: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
})

