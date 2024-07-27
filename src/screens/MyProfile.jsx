import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { colors } from "../global/colors";
import { useGetProfileImageQuery } from "../services/shopServices";
import { clearUser } from "../features/User/UserSlice";
import { truncateSession } from "../persistence";
import { CustomButton } from "../components";

const MyProfile = ({ navigation }) => {
  const dispatch = useDispatch();

  const { imageCamera, localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);

  const defaultImageRoute = "../../assets/userIcon.png";

  const launchLocation = async () => {
    navigation.navigate("ListAddress");
  };

  const signOut = async () => {
    try {
      await truncateSession();
      dispatch(clearUser());
    } catch (error) {
      console.log({ errorClearUser: error });
    }
  };

  return (
    <>
      <View style={styles.imgContainer}>
        <Image
          style={styles.imagen}
          resizeMode="cover"
          source={
            imageCamera || imageFromBase
              ? { uri: imageFromBase?.image || imageCamera }
              : require(defaultImageRoute)
          }
        />
      </View>
      <CustomButton
        accion={() => navigation.navigate("ImageSelector")}
        texto={imageCamera || imageFromBase ? "Cambiar imagen" : "Agregar foto de perfil"}
        estilo={styles.btn}
      />
      <CustomButton
        accion={launchLocation}
        texto="Seleccionar ubicación"
        estilo={styles.btn}
      />
      <CustomButton
        accion={signOut}
        texto="Cerrar sesión"
        estilo={styles.btn}
      />
    </>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  imgContainer: {
    borderRadius: 100,
    backgroundColor: "#050505",
    borderColor: "#8f8f8f",
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 10,

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
