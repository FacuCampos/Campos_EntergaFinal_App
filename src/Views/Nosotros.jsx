import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const Nosotros = ({navigation, route}) => {

  const {id, precio, medidas} = route.params

  const volver = () => {
    navigation.navigate('Inicio')
    // navigation.goBack()
    // navigation.push('Inicio')
  };

  return (
    <View style={styles.contenedor}>
      <Text>Nosotros</Text>
      <Text>ID: {id}</Text>
      <Text>Precio: {precio}</Text>
      <Text>Medidas:</Text>
      <Text>Peso: {medidas.peso}</Text>
      <Text>Altura: {medidas.altura}</Text>
      <Button title="Volver" onPress={() => volver()} />
    </View>
  );
};

export default Nosotros;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
