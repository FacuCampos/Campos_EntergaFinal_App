import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Search, ProductItem, Subtitle } from "../components";

import { useGetProductsByCategoryQuery } from "../services/shopServices";
import Loading from "../components/Loading";

const ItemListCategory = ({ navigation, route }) => {
  const [keyword, setKeyword] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [error, setError] = useState("");
  const [portrait, setPortrait] = useState(true);
  const [key, setKey] = useState("flatListPortrait");

  const { categoriaElegida } = route.params;
  const { data: productsFetched, isLoading } = useGetProductsByCategoryQuery(
    categoriaElegida.nombre
  );

  const { width, height } = useWindowDimensions();

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={portrait ? styles.container : styles.containerLandscape}>
      <Subtitle
        navigation={navigation}
        titulo={
          categoriaElegida.nombre.charAt(0).toUpperCase() +
          categoriaElegida.nombre.slice(1).toLowerCase()
        }
        estilo={{
          fontSize: 30,
          textAlign: "center",
          fontFamily: "TituloFont",
          textAlignVertical: "center",
          width: width - 130,
        }}
      />
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
    alignItems: "center",
  },
  containerLandscape: {
    marginTop: 20,
    paddingHorizontal: 0,
    marginHorizontal: 10,
    gap: 20,
  },
});
