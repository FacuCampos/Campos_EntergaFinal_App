import { StyleSheet, Text } from "react-native";
import { AddressItem, CustomButton } from "../components";
import { useSelector } from "react-redux";
import { useGetLocationQuery } from "../services/shopServices";

const ListAdress = ({ navigation }) => {
  const { localId } = useSelector((state) => state.auth.value);

  const { data: location } = useGetLocationQuery(localId);

  return location ? (
      <AddressItem location={location} navigation={navigation} />
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
  }
});
