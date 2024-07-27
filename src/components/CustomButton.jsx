import { Platform, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../global/colors";

const CustomButton = ({
  accion = () => {},
  texto = "",
  estilo = styles.btn,
  estiloTxt = styles.btnTexto,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={accion}
      style={({ pressed }) => [estilo, { opacity: pressed ? 0.8 : 1 }]}
      disabled={disabled}
    >
      <Text style={estiloTxt}>{texto}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.secundario,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  btnTexto: {
    color: colors.textoClaro,
    fontFamily: "InputFontBold",
    top: Platform.OS === "android" ? 3 : 0,
  },
});
