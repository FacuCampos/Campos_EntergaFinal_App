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
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useGetProductByIdQuery } from "../services/shopServices";

import { colors } from "../global/colors";
import { Counter } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../features/Cart/CartSlice";

const ItemDetail = ({ navigation, route }) => {
  const { width, height } = useWindowDimensions();

  const { productoElegido } = route.params;

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [orientacion, setOrientacion] = useState("portrait");

  const { data: producto, isLoading } = useGetProductByIdQuery(
    productoElegido.id
  );

  useEffect(() => {
    if (width > height) setOrientacion("landscape");
    else setOrientacion("portrait");
  }, [width, height]);

  const handleAgregarCarrito = () => {
    dispatch(addCartItem);
    dispatch(addCartItem({...producto, cantidad: 1}))
  };

  return (
    <ScrollView StickyHeaderComponent={Pressable} style={styles.container}>
      {producto && orientacion === "portrait" && (
        <View style={styles.detailTitulo}>
          <Pressable
            style={styles.iconBack}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-circle" size={30} color="black" />
          </Pressable>
          <Text style={styles.titulo}>{producto.titulo}</Text>
        </View>
      )}

      {producto && (
        <View
          style={
            orientacion === "portrait"
              ? styles.prodContainer
              : { ...styles.prodContainer, ...styles.prodContainerLandscape }
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
            <View
              style={
                orientacion === "portrait"
                  ? styles.textBox
                  : styles.textBoxLandscape
              }
            >
              {orientacion !== "portrait" && (
                <Text style={styles.titulo}>{producto.titulo}</Text>
              )}
              <Text style={styles.descripcion}>{producto.descripcion}</Text>
              <Text style={styles.price}>
                ${producto.precio.toLocaleString("es")}
              </Text>
            </View>
            <Counter />
            <TouchableOpacity
              style={
                orientacion === "portrait"
                  ? { ...styles.buttons, ...styles.buttonAdd }
                  : {
                      ...styles.buttons,
                      ...styles.buttonAdd,
                      ...styles.buttonAddLandscape,
                    }
              }
              onPress={handleAgregarCarrito}
              disabled={count <= 0}
            >
              <Text style={styles.buttonText}> + Añadir al carrito</Text>
            </TouchableOpacity>
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
    backgroundColor: colors.fondo,
  },
  detailTitulo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cards,
    paddingVertical: 20,
    paddingHorizontal: 15,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 2,
  },
  iconBack: {
    marginRight: 15,
  },
  titulo: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: "TituloMedium",
    flex: 1,
  },
  buttons: {
    backgroundColor: colors.secundario,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
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
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").width - 30,
    minWidth: 150,
  },
  imageLandscape: {
    width: "30%",
    height: ((Dimensions.get("window").width - 30) * 30) / 100,
    minWidth: 150,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  textContainer: {
    flexDirection: "column",
    marginTop: 20,
    gap: 10,
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
  descripcion: {
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 24,
  },
  price: {
    textAlign: "right",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonAdd: {
    justifyContent: "center",
  },
  buttonAddLandscape: {
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
