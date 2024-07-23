import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../global/colors";

import { CartItem } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/shopServices";
import { deleteCart } from "../features/Cart/CartSlice";


const Cart = () => {

  const {items: cartData, total} = useSelector((state) => state.cart.value)

  const [triggerPostOrder, result] = usePostOrderMutation()

  const dispatch = useDispatch()

  const confirmarOrden = () => {
    triggerPostOrder({items: cartData, user: 'Facu', total});
    dispatch(deleteCart())
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartData}
        keyExtractor={(producto) => producto.id}
        contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />;
        }}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          <Text style={{ fontWeight: "bold" }}>Total: </Text>
          {total ? "$ " + total.toLocaleString('es') : "$ 0"}
        </Text>
        <TouchableOpacity style={styles.confirmarPressable} onPress={confirmarOrden}>
          <Text style={styles.confirmarTexto}>Confirmar orden</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    justifyContent: "space-between",

  },
  totalContainer: {
    backgroundColor: colors.textoClaro,
    padding: 20,
    alignItems: "center",
    gap: 20,
    borderTopColor: 'grey',
    borderTopWidth: 2,
    
  },
  totalText: {
    fontSize: 24,
  },
  confirmarPressable: {
    backgroundColor: colors.secundario,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 2,
  },
  confirmarTexto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  }
});
