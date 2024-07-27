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

  const confirmImage = () => {
    try {
      dispatch(setCameraImage(imagen));
      triggerPostImage({ imagen, localId });
      navigation.goBack();
    } catch (error) {
      console.log({ errorSetImage: error });
    }
  };

  const defaultImageRoute = "../../assets/userIcon.png";

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={
            imagen || imageFromBase
              ? { uri: imageFromBase?.image || imagen }
              : require(defaultImageRoute)
          }
        />
      </View>
      <CustomButton
        accion={() => pickImage(true)}
        texto={imagen || imageFromBase ? "Tomar nueva foto" : "Tomar una foto"}
      />
      <CustomButton
        accion={() => pickImage(false)}
        texto={
          imagen || imageFromBase
            ? "Subir nueva foto"
            : "Seleccionar desde galería"
        }
      />
      <CustomButton
        accion={
          imagen || imageFromBase ? confirmImage : () => navigation.goBack()
        }
        texto={imagen || imageFromBase ? "Confirmar foto" : "Cancelar"}
      />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
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
  img: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
