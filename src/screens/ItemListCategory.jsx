import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import productos from "../data/products.json";
import { Search, ProductItem } from "../components";

const ItemListCategory = ({ navigation, route }) => {
  const [keyword, setKeyword] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  
  const [error, setError] = useState("");

  const { categoriaElegida } = route.params;

  const [portrait, setPortrait] = useState(null);
  const [key, setKey] = useState("flatListPortrait");

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setPortrait(width < height);
    setKey(width < height ? "flatListPortrait" : "flatListLandscape");
  }, [width, height]);

  useEffect(() => {
    const productosPreFiltrados = productos.filter(
      (prod) => prod.categoria === categoriaElegida
    );

    const filtroProductos = productosPreFiltrados.filter((prod) =>
      prod.titulo.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    );

    setProductosFiltrados(filtroProductos);
    /* const regexDigits = /\d/;
  const hasDigits = regexDigits.test(keyword);
  if (hasDigits) {
    setError("No uses dígitos");
    return;
  }

  const regexThreeOrMoreCharacters = /[a-zA-Z]{3,}/;
  const hasThreeOrMoreCharacters = regexThreeOrMoreCharacters.test(keyword);
  if (!hasThreeOrMoreCharacters && keyword.length) {
    setError("Escribe 3 o más caracteres");
    return;
  } */
  }, [keyword, categoriaElegida]);

  return (
    <View style={portrait ? styles.container : styles.containerLandscape}>
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
    width: "100%",
    flex: 1,
    marginTop: 10,
    flexDirection: "column",
    gap: 10,
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
});
