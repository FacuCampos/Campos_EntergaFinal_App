import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../global/colors";
import { Ionicons } from "@expo/vector-icons";

const Subtitle = ({ navigation, titulo, estilo = styles.subTitulo }) => {
  return (
    <View style={styles.subTituloContainer}>
      <Pressable style={styles.iconBack} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="black" />
      </Pressable>
      <Text style={estilo}>
        {titulo}
      </Text>
    </View>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  subTituloContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cards,
    paddingVertical: 15,
    paddingHorizontal: 15,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 2,
  },
  iconBack: {
    marginRight: 20,
  },
  subTitulo: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: "TituloFont",
    flex: 1,
  },
});
