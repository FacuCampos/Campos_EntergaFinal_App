import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../global";

const InputForm = ({
  label,
  onChange,
  error = "",
  isSecure = false,
  estilo = styles.input,
  estiloTxt = styles.label,
}) => {
  const [input, setInput] = useState("");
  const onChangeText = (text) => {
    setInput(text), onChange(text);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={estiloTxt}>{label}</Text>
      <TextInput
        style={estilo}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />
      {error != "" && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  label: {
    width: "90%",
    fontSize: 16,
    fontFamily: "SecundariaFontBold",
    color: colors.textoClaro,
    textAlign: "center",
  },
  error: {
    paddintTop: 2,
    fontSize: 16,
    color: "white",
    fontFamily: "InputFont",
  },
  input: {
    width: "90%",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: colors.secundario,
    padding: 2,
    fontFamily: "InputFontItalic",
    fontSize: 14,
    textAlign: "center",
  },
});
