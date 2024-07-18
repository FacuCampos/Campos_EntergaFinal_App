import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../global/colors";

const anchoPantalla = Dimensions.get("window").width;
const anchoTexto = anchoPantalla - 190;
const anchoTextoLandscape = (anchoPantalla/2) - 210
const anchoPressableLandscape = anchoPantalla / 2 - 30;

const ProductItem = ({ producto, navigation }) => {
  const { width, height } = useWindowDimensions();
  const [portrait, setPortrait] = useState(true);

  useEffect(() => {
    setPortrait(width < height);
  }, [width, height]);

  return (
    <Pressable
      onPress={() => {navigation.navigate('ItemDetail', {productoElegido: producto})}}
      style={
        portrait
          ? styles.pressable
          : { ...styles.pressable, ...styles.pressableLandscape }
      }
    >
      <View style={styles.card}>
        <Text style={portrait ? styles.texto : styles.textoLandscape}>
          {producto.titulo}
        </Text>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: producto.thumbnail }}
        />
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  pressable: {
    height: 140,
    marginHorizontal: 10,
  },
  pressableLandscape: {
    width: anchoPressableLandscape,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    backgroundColor: colors.secundario,
    shadowColor: "black",
    borderRadius: 20,
    justifyContent: "space-between",

    overflow: "hidden",

    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  texto: {
    color: colors.fondo,
    width: anchoTexto,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  textoLandscape: {
    color: colors.fondo,
    width: anchoTextoLandscape,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    height: "100%",
    width: 140,
    marginLeft: 20,
  }
});
