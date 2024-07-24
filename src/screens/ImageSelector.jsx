import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as ImagePicker from "expo-image-picker";

import { colors } from "../global/colors";
import { setCameraImage } from "../features/User/UserSlice";
import {
  useGetProfileImageQuery,
  usePostProfileImageMutation,
} from "../services/shopServices";

const ImageSelector = ({ navigation }) => {
  const [imagen, setImagen] = useState(null);
  const [isImageFromCamera, setIsImageFromCamera] = useState(false);

  const dispatch = useDispatch();

  const [triggerPostImage, result] = usePostProfileImageMutation();
  const { localId } = useSelector((state) => state.auth.value);
  const {data: imageFromBase} = useGetProfileImageQuery(localId)

  const verifyCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (!status) {
      return false;
    } else {
      return true;
    }
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermission();
    setIsImageFromCamera(true)
    if (isCameraOk) {
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
    }
  };

  const confirmImage = () => {
    try {
      dispatch(setCameraImage(imagen));
      triggerPostImage({ imagen, localId });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {imagen || imageFromBase ? (
        <>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              resizeMode="cover"
              source={{ uri: imagen || imageFromBase?.imagen }}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.btn,
              { opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={pickImage}
          >
            <Text style={styles.btnTexto}>Tomar nueva foto</Text>
          </Pressable>
          <Pressable
            onPress={confirmImage}
            style={({ pressed }) => [
              styles.btn,
              { opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Text style={styles.btnTexto}>Confirmar foto</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.containerPhoto}>
            <Text>No hay foto para mostrar</Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.btn,
              { opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={pickImage}
          >
            <Text style={styles.btnTexto}>Tomar una foto</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
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
  containerPhoto: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.cards,
    borderWidth: 1,
  },
});
