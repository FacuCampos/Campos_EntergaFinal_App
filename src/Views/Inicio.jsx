import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const Inicio = ({ navigation }) => {
  const info = {
    id: 462723,
    precio: 6000,
    medidas: {
      peso: 100,
      altura: 150,
      ancho: 120,
    },
  };

  const visitarNosotros = () => {
    navigation.navigate("Nosotros", info);
  };

  return (
    <View style={styles.contenedor}>
      <Text>Inicio</Text>
      <Button title="Ir a Nosotros" onPress={() => visitarNosotros()} />
    </View>
  );
};

export default Inicio;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
