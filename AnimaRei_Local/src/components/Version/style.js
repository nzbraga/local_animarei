import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export default StyleSheet.create({
  
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end', // Alinha o conteúdo na parte inferior do pai
    alignItems:'flex-end', 
  },
  
  text: {
    fontSize: 15,
    borderRadius: 25,
    padding:3,
    margin:3,
    backgroundColor: colors.darkPry, 
    color: colors.backSec,
  },
})
