import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  ScrollView,
  View,
  useWindowDimensions,
  Dimensions,
} from "react-native";

import productos from "../data/products.json";
import { colors } from "../global/colors";

const ItemDetail = ({ navigation, route }) => {
  const { width, height } = useWindowDimensions();

  const {productoElegido} = route.params

  const [orientacion, setOrientacion] = useState("portrait");

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    if (width > height) setOrientacion("landscape");
    else setOrientacion("portrait");
  }, [width, height]);

  useEffect(() => {
    //Encontrar el producto por su id
    const productoSeleccionado = productos.find(
      (prod) => prod.id === productoElegido.id
    );

    setProducto(productoSeleccionado);
  }, [productoElegido]);

  return (
    <ScrollView
      StickyHeaderComponent={Pressable}
      style={styles.container} >

      {producto && (
        <View
          style={
            orientacion === "portrait"
              ? styles.prodContainer
              : {...styles.prodContainer, ...styles.prodContainerLandscape}
          }
        >
          <Image
            source={{ uri: producto.imagenes[0] }}
            style={
              orientacion === "portrait" ? styles.image : styles.imageLandscape
            }
            resizeMode="cover"
          />
          <View
            style={
              orientacion === "portrait"
                ? styles.textContainer
                : styles.textContainerLandscape
            }
          >
            <View style={
              orientacion === 'portrait'
              ? styles.textBox
              : styles.textBoxLandscape}>
              <Text style={styles.titulo}>{producto.titulo}</Text>
              <Text style={styles.descripcion}>{producto.descripcion}</Text>
              <Text style={styles.price}>${producto.precio.toLocaleString('es')}</Text>
            </View>
            <Pressable style={
              orientacion === "portrait"
                ? {...styles.buttons, ...styles.buttonAdd }
                : {...styles.buttons, ...styles.buttonAdd, ...styles.buttonAddLandscape}
            }>
              <Text style={styles.buttonText}> + Añadir al carrito</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    backgroundColor: colors.secundario,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.fondo,
  },
  prodContainer: {
    marginVertical: 20,
    marginHorizontal: 15,
    backgroundColor: colors.cards,
    borderRadius: 10,

    overflow: "hidden",

    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  prodContainerLandscape: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    padding: 20,
  },
  image: {
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').width - 30,
    minWidth: 150,
  },
  imageLandscape: {
    width: "30%",
    height: (Dimensions.get('window').width - 30) * 30/100,
    minWidth: 150,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  textContainer: {
    flexDirection: "column",
    marginTop: 20,
    gap: 20
  },
  textContainerLandscape: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "start",
    gap: 10,
  },
  textBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
    gap: 20,
    paddingHorizontal: 20,
  },
  textBoxLandscape: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
    gap: 20,
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: 'OswaldMedium'
  },
  descripcion:{
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 24
  },
  price: {
    textAlign: "right",
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonAdd: {
    justifyContent: 'center'
  },
  buttonAddLandscape: {
    borderRadius: 10,
    marginHorizontal: 10
  }
});
