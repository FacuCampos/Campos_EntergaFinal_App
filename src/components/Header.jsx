import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { colors } from "../global/colors";

const Header = ({ titulo, producto = null, categoriaElegida, navigation, route}) => {

  categoriaElegida && console.log('hola');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    paddingBottom: 10,
    width: "100%",
    backgroundColor: colors.primario,
    justifyContent: "center",
  },
  titulo: {
    textAlign: 'center',
    color: colors.fondo,
    fontSize: 28,
    fontFamily: "OswaldMedium",
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 2,

  },
  buttonBack: {
    width: '100%',
    backgroundColor: colors.secundario,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.fondo,
  },
});
