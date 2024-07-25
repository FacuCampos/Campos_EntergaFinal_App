import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AddressItem } from "../components";
import { colors } from "../global/colors";
import { useSelector } from "react-redux";
import { useGetLocationQuery } from "../services/shopServices";

const ListAdress = ({ navigation }) => {
  const { localId } = useSelector((state) => state.auth.value);

  const { data: location } = useGetLocationQuery(localId);

  return location ? (
    <View style={styles.container}>
      <AddressItem location={location} navigation={navigation} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>No hay ubicacion establecida</Text>
      <Pressable
        onPress={() => navigation.navigate("LocationSelector")}
        style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.8 : 1 }]}
      >
        <Text style={styles.btnTexto}>Seleccionar ubicación</Text>
      </Pressable>
    </View>
  );
};

export default ListAdress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    margin: 20,
  },
  btn: {
    backgroundColor: colors.secundario,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  btnTexto: {
    color: colors.textoClaro,
    fontFamily: "InputFontBold",
    top: Platform.OS === "android" ? 3 : 0,
  },
});
