import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { colors } from "../global/colors";

import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/Shop/ShopSlice";

const Card = ({ categoriaElegida, navigation }) => {

  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setCategorySelected(categoriaElegida.nombre));
    navigation.navigate("ItemListCategory", { categoriaElegida });
  };

  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={handleNavigate}>
      <Image
        source={{ uri: categoriaElegida.imagen }}
        style={styles.backgroundImage}
        blurRadius={8}
      />
      <View style={styles.overlay} />
      <Text style={styles.texto}>
        {categoriaElegida.nombre.charAt(0).toUpperCase() +
          categoriaElegida.nombre.slice(1).toLowerCase()}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  touchableOpacity: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    height: 200,
    borderRadius: 20,
    backgroundColor: '#050505',
    overflow: "hidden",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
    
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#5f5f5f",
    opacity: 0.2,
  },
  texto: {
    fontSize: 28,
    fontFamily: "SecundariaFontBold",
    color: colors.textoClaro,
    textShadowColor: colors.textoOscuro,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  backgroundImage: {
    position: "absolute",
    width: "120%",
    height: "120%",
    resizeMode: "cover",
    opacity: 0.6,
  },
});
