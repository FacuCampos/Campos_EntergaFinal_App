import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { colors } from "../global/colors";

const Card = ({ categoriaElegida, navigation }) => {

  return (
      <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('ItemListCategory', {categoriaElegida})}>
        <Text style={styles.texto}>{categoriaElegida}</Text>
      </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  touchableOpacity: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.secundario,
    flex: 1,
    height: 200,
    borderRadius: 20,
  },
  texto: {
    fontSize: 20,
  },
});
