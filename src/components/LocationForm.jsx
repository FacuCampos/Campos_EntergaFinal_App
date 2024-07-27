import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputForm from "./InputForm";
import { colors } from "../global/colors";

const LocationForm = () => {
  return (
    <View style={styles.container}>
      <InputForm label={"Calle"} estilo={styles.input} estiloTxt={styles.label}/>
      <InputForm label={"Número"} estilo={styles.input} estiloTxt={styles.label}/>
      <InputForm label={"Dpto (opcional)"} estilo={styles.input} estiloTxt={styles.label}/>
      <InputForm label={"Barrio"} estilo={styles.input} estiloTxt={styles.label}/>
    </View>
  );
};

export default LocationForm;

const styles = StyleSheet.create({
    container:{
        width: '100%'
    },
    input:{
        width: "70%",
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#f9f9f9',
        padding: 2,
        fontFamily: "InputFontItalic",
        fontSize: 14,
        textAlign: "center",
    },
    label: {
        width: "90%",
        fontSize: 16,
        fontFamily: "SecundariaFontBold",
        color: colors.textoOscuro,
        textAlign: "center",
    }
});
