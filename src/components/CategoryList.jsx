import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "./Card";

import data from "../data/categories.json";

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push("vacio");
    numberOfElementsLastRow = numberOfElementsLastRow + 1;
  }

  return data;
};

const CategoryList = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [orientacion, setOrientacion] = useState("portrait");
  const [key, setKey] = useState("flatListPortrait");

  useEffect(() => {
    if (width > height) {
      setOrientacion("landscape");
      setKey("flatListLandscape");
    } else {
      setOrientacion("portrait");
      setKey("flatListPortrait");
    }
  }, [width, height]);

  const numColumns = orientacion === "portrait" ? 2 : 4;

  return (
    <FlatList
      key={key}
      data={formatData(data, numColumns)}
      numColumns={numColumns}
      columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
      contentContainerStyle={{ gap: 10, paddingBottom: 20, paddingTop: 10 }}
      keyExtractor={(categoria, idx) => categoria + idx}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        if (item == "vacio") {
          return <View style={styles.itemInvisible} />;
        } else {
          return <Card categoriaElegida={item} navigation={navigation} />;
        }
      }}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  itemInvisible: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    height: 200,
    borderRadius: 20,
  },
});
