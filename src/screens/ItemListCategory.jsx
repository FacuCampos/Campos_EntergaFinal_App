import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Search, ProductItem } from "../components";
import { colors } from "../global/colors";

import { Ionicons } from "@expo/vector-icons";
import { useGetProductsByCategoryQuery } from "../services/shopServices";
import Loading from "../components/Loading";

const anchoPantalla = Dimensions.get("screen").width;

const ItemListCategory = ({ navigation, route }) => {
  const [keyword, setKeyword] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [error, setError] = useState("");

  const { categoriaElegida } = route.params;
  const {
    data: productsFetched,
    error: errorFetched,
    isLoading,
  } = useGetProductsByCategoryQuery(categoriaElegida.nombre);

  const { width, height } = useWindowDimensions();
  const [portrait, setPortrait] = useState(null);
  const [key, setKey] = useState("flatListPortrait");
  
  useEffect(() => {
    setPortrait(width < height);
    setKey(width < height ? "flatListPortrait" : "flatListLandscape");
  }, [width, height]);
  
  useEffect(() => {
    if (!isLoading) {
      const filtroProductos = productsFetched.filter((prod) =>
        prod.titulo.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      );

      setProductosFiltrados(filtroProductos);
      setError("");
    }
  }, [keyword, categoriaElegida, productsFetched, isLoading]);

  if (!productsFetched) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={portrait ? styles.container : styles.containerLandscape}>
      <View style={styles.catTituloContainer}>
        <Pressable style={styles.iconBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={30} color="black" />
        </Pressable>
        <Text style={styles.catTitulo}>
          {categoriaElegida.nombre.charAt(0).toUpperCase() +
            categoriaElegida.nombre.slice(1).toLowerCase()}
        </Text>
      </View>
      <Search
        error={error}
        onSearch={setKeyword}
        goBack={() => navigation.goBack()}
      />

      {portrait ? (
        <FlatList
          key={key}
          data={productosFiltrados}
          keyExtractor={(prod) => prod.id}
          contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductItem producto={item} navigation={navigation} />
          )}
        />
      ) : (
        <FlatList
          data={productosFiltrados}
          numColumns={2}
          contentContainerStyle={{ gap: 20, paddingBottom: 10 }}
          keyExtractor={(producto) => producto.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductItem producto={item} setItemElegido={setItemElegido} />
          )}
        />
      )}
    </View>
  );
};

export default ItemListCategory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.fondo,
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  containerLandscape: {
    width: "100%",
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
    paddingHorizontal: 0,
    marginHorizontal: 10,
    gap: 20,
  },
  catTituloContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.terceario,
    paddingBottom: 10,
    overflow: "hidden",

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 2,
  },
  iconBack: {
    paddingHorizontal: 10,
    top: 5,
  },
  catTitulo: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "TituloFont",
    textAlignVertical: "center",
    width: anchoPantalla - 88,
  },
});
