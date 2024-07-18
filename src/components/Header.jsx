import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

import { colors } from "../global/colors";

const Header = ({ titulo, producto = null, navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>

      {producto && (
        <Pressable
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-circle" size={24} color={colors.fondo} />
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    width: "100%",
    backgroundColor: colors.primario,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    color: colors.fondo,
    fontSize: 28,
    fontFamily: "OswaldMedium",
    marginBottom: 5
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
