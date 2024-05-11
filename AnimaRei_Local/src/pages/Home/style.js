// style.js
import { StyleSheet } from "react-native";
import { getColor } from "../../components/Style/colors2";

export const style = (theme) => StyleSheet.create({
  container: {
    backgroundColor: getColor(theme).darkPry, 
    height: "100%",
    zIndex:-1
  }
});
