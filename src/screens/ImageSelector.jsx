import { useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as ImagePicker from "expo-image-picker";

import { setCameraImage } from "../features/User/UserSlice";
import {
  useGetProfileImageQuery,
  usePostProfileImageMutation,
} from "../services/shopServices";
import CustomButton from "../components/CustomButton";
import { colors } from "../global/colors";

const ImageSelector = ({ navigation }) => {
  const [imagen, setImagen] = useState(null);

  const dispatch = useDispatch();

  const [triggerPostImage, result] = usePostProfileImageMutation();
  const { localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);

  const verifyCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (!status) {
      return false;
    } else {
      return true;
    }
  };

  const pickImage = async (camara) => {
    const isCameraOk = await verifyCameraPermission();
    if (isCameraOk) {
      if (camara == true) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          base64: true,
          quality: 0.2,
        });
        if (!result.canceled) {
          setImagen(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          base64: true,
          quality: 0.2,
        });
        if (!result.canceled) {
          setImagen(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
      }
    }
  };

  const defaultImageRoute = "../../assets/userIcon.png";

  const deleteImage = () => {
    try {
      setImagen("default");
    } catch (error) {
      console.log({ errorDeleteImg: error });
    }
  };

  const confirmImage = () => {
    try {
      if (imagen == "default") {
        dispatch(setCameraImage(null));
        triggerPostImage({ imagen: null, localId });
      } else {
        dispatch(setCameraImage(imagen));
        triggerPostImage({ imagen, localId });
      }
      navigation.goBack();
    } catch (error) {
      console.log({ errorSetImage: error });
    }
  };

  return (
    <>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={
            imagen == "default"
              ? require(defaultImageRoute)
              : imagen || imageFromBase
              ? { uri: imagen || imageFromBase?.image }
              : require(defaultImageRoute)
          }
        />
      </View>
      <CustomButton
        accion={() => pickImage(true)}
        texto={imagen || imageFromBase ? "Tomar nueva foto" : "Tomar una foto"}
        estilo={styles.btn}
      />
      <CustomButton
        accion={() => pickImage(false)}
        texto={
          imagen || imageFromBase
            ? "Subir nueva foto"
            : "Seleccionar desde galería"
        }
        estilo={styles.btn}
      />
      <CustomButton
        accion={deleteImage}
        texto="Borrar foto"
        estilo={styles.btn}
      />
      <CustomButton
        accion={
          imagen || imageFromBase ? confirmImage : () => navigation.goBack()
        }
        texto={imagen || imageFromBase ? "Confirmar foto" : "Cancelar"}
        estilo={styles.btn}
      />
    </>
  );
};

export default ImageSelector;

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
  img: {
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
});
