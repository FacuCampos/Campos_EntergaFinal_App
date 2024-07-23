import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../global/colors";

const CartItem = ({ cartItem }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{cartItem.titulo}</Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>Cantidad: </Text>
          {cartItem.cantidad}
        </Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>Marca: </Text> {cartItem.marca}
        </Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>Precio unitario: </Text>
          {cartItem.precio}
        </Text>
        <Text style={styles.texto}>
          <Text style={{ fontWeight: "bold" }}>Subtotal: </Text>
          {cartItem.precio * cartItem.cantidad}
        </Text>
      </View>
      <MaterialCommunityIcons name="trash-can" size={30} color="black" />
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    height: 160,
    marginHorizontal: 10,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.cards,
    shadowColor: "black",
    borderRadius: 20,

    alignItems: 'center',

    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  textContainer: {
    flex: 1,
    height: '100%',
    display: "flex",
    justifyContent: "space-between",
  },
  titulo: {
    fontFamily: "TituloMedium",
    fontSize: 18,
  },
  texto: {
    fontSize: 14
  }
});
