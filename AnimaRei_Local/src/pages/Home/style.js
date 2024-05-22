// style.js
import { StyleSheet } from "react-native";
import { getColor } from "../../components/Style/colors";

export const styles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: getColor(theme).oppBase, 
    height: "100%",
    zIndex:-1
  }
});
