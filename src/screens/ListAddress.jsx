import { Dimensions, StyleSheet, Text } from "react-native";
import { AddressItem, CustomButton, Subtitle } from "../components";
import { useSelector } from "react-redux";
import { useGetLocationQuery } from "../services/shopServices";

const ListAdress = ({ navigation }) => {
  const { localId } = useSelector((state) => state.auth.value);

  const { data: location } = useGetLocationQuery(localId);

  const anchoPantalla = Dimensions.get("screen").width;

  return location ? (
    <>
      <Subtitle
        navigation={navigation}
        titulo={"Mi Ubicación"}
        estilo={{
          fontSize: 30,
          textAlign: "center",
          fontFamily: "TituloFont",
          textAlignVertical: "center",
          width: anchoPantalla - 130,
        }}
      />
      <AddressItem location={location} navigation={navigation} />
    </>
  ) : (
    <>
      <Text style={styles.text}>No hay ubicacion establecida</Text>
      <CustomButton
        accion={() => navigation.navigate("LocationSelector")}
        texto="Seleccionar ubicación"
      />
    </>
  );
};

export default ListAdress;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 20,
  },
});
