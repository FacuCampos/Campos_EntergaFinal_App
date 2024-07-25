import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../global/colors";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Cargando</Text>
      <ActivityIndicator color={colors.secundario} size={75}/>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    },
    texto: {
        fontFamily: 'InputFont',
        fontSize: 26
    }
});
