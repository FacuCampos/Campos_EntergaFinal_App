import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";

import { colors } from "../global/colors";

import {
  CustomButton,
  LocationForm,
  MapPreview,
  Subtitle,
} from "../components";
import { googleMapsApiKey } from "../database/googleMaps";
import { usePostLocationMutation } from "../services/shopServices";

const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const [triggerPostUserLocation, result] = usePostLocationMutation();

  const { localId } = useSelector((state) => state.auth.value);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Se denegó el permiso a la ubicación");
          return;
        }
        if (status == "granted") {
          let location = await Location.getCurrentPositionAsync();
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      } catch (err) {
        console.log({ errorLocationRequest: err });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {
          const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;
          const response = await fetch(url_reverse_geocode);
          const data = await response.json();
          console.log(data.results[0]);
          setAddress(data.results[0].formatted_address);
        }
      } catch (err) {
        console.log({ errorSetAddress: err });
      }
    })();
  }, [location]);

  const onConfirmAddress = () => {
    try {
      const date = new Date();

      triggerPostUserLocation({
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          address,
          updatedAt: `${date.getDate}/${date.getMonth()}/${date.getFullYear()}`,
        },
        localId,
      });

      navigation.goBack();
    } catch (err) {
      console.log({ errorPostUserLocation: err });
    }
  };

  return (
    <>
      <Subtitle navigation={navigation} titulo="Mi dirección" />
      {location ? (
        <ScrollView>
          <View style={styles.container}>
            <MapPreview location={location} />
            <Text style={styles.text}>Direccion encontrada:</Text>
            <Text style={styles.address}>{address}</Text>
            <LocationForm />
            <CustomButton
              accion={onConfirmAddress}
              texto="Confirmar direccion"
              estilo={styles.boton}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noLocationContainer}>
          <Text style={{ ...styles.text, textAlign: "center" }}>
            Ubicación no encontrada
          </Text>
        </View>
      )}
    </>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20
  },
  text: {
    fontFamily: "SecundariaFont",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  noLocationContainer: {
    marginVertical: 20,
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "red",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.cards,
  },
  address: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
  },
  boton: {
    backgroundColor: colors.secundario,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: "70%",
    marginTop: 20,
  },
});
