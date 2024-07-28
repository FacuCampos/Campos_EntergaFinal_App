import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  useWindowDimensions,
  Dimensions,
} from "react-native";

import { useGetProductByIdQuery } from "../services/shopServices";

import { colors } from "../global";
import { Counter, CustomButton, Loading, Subtitle } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../features/Cart/CartSlice";
import { resetCounter } from "../features/Counter/CounterSlice";

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
    dispatch(addCartItem({ ...producto, cantidad: count }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetCounter());
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView>
      {producto && orientacion === "portrait" && (
        <Subtitle navigation={navigation} titulo={producto.titulo} />
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
          </View>
          <CustomButton
            accion={handleAgregarCarrito}
            texto="+ Añadir al carrito"
            estilo={
              orientacion === "portrait"
                ? styles.buttonAdd
                : {
                    ...styles.buttonAdd,
                    borderRadius: 10,
                    marginHorizontal: 10,
                  }
            }
            estiloTxt={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.fondo,
            }}
            disabled={count <= 0}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  buttonAdd: {
    backgroundColor: colors.secundario,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
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
});
