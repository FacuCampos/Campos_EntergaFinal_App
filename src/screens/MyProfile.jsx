import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

import { colors } from "../global/colors";
import { useGetProfileImageQuery } from "../services/shopServices";

const MyProfile = ({ navigation }) => {
  const { imageCamera, localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);
  const launchCamera = async () => {
    navigation.navigate("ImageSelector");
  };

  const defaultImageRoute = "../../assets/userIcon.png";

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.imagen}
          resizeMode="cover"
          source={
            imageCamera
              ? { uri: imageFromBase?.image || imageCamera }
              : require(defaultImageRoute)
          }
        />
      </View>
      <Pressable
        onPress={() => navigation.navigate("ImageSelector")}
        style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.8 : 1 }]}
      >
        <Text style={styles.btnTexto}>
          { imageCamera ? "Cambiar imagen" : "Agregar foto de perfil"}
        </Text>
      </Pressable>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  imgContainer: {
    borderRadius: 100,
    backgroundColor: "#050505",
    borderColor: "#8f8f8f",
    borderWidth: 2,

    overflow: "hidden",

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imagen: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
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
