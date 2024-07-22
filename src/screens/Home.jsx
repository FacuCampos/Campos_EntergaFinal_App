import React from "react";
import { StyleSheet, View } from "react-native";
import { CategoryList } from "../components";
import { colors } from "../global/colors";

const Home = ({navigation, route}) => {

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