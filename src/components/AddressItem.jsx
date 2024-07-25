import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { colors } from "../global/colors";

const AddressItem = ({ location, navigation }) => {
  const onChangeLocation = () => {
    navigation.navigate("LocationSelector");
  };

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text>{location.address}</Text>
      </View>
      <Pressable onPress={onChangeLocation}>
        <Entypo name="location" size={30} color={colors.textoClaro}>
          <Text style={styles.text2}>Cambiar</Text>
        </Entypo>
      </Pressable>
    </View>
  );
};

export default AddressItem

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: colors.secundario,
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
},
text: {
    fontFamily: "SecundariaFont",
    fontSize: 17,
    color: colors.textoOscuro,
},
text2: {
    fontFamily: "SecundariaFont",
    fontSize: 19,
    color: colors.textoOscuro,
    padding: 8,
},
})