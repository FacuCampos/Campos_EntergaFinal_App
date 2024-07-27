import { StyleSheet, Text, View } from "react-native";
import { colors } from "../global/colors";

const RegisterForm = ({ children , titulo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titulo}</Text>
      <View style={styles.hr}></View>
      {children}
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primario,
    gap: 15,
    padding: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 4,
  },
  title: {
    fontSize: 30,
    fontFamily: "TituloFont",
    color: colors.textoClaro,
  },
  hr: {
    height: 1,
    width: "95%",
    backgroundColor: "#000",
    opacity: 0.3,
  },
});
