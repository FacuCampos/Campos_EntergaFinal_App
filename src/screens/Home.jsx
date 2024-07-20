import React from "react";
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import categorias from "../data/categories.json";
import { Card, CategoryList } from "../components";
import { colors } from "../global/colors";

const Home = ({navigation, route}) => {
  const columnas = 2;

  return (
    <View style={styles.container}>
      <CategoryList navigation={navigation} route={route}/>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo
  },
});