import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../global/colors";

import * as Location from "expo-location";
import MapPreview from "../components/MapPreview";
import { googleMapsApiKey } from "../database/googleMaps";
import { usePostLocationMutation } from "../services/shopServices";
import { useSelector } from "react-redux";

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
        console.log(err);
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
          console.dir(data);
          setAddress(data.results[0].formatted_address);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [location]);

  const onConfirmAddress = () => {

    try {
      const date = new Date()
  
      triggerPostUserLocation({
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          address,
          updatedAt: `${date.getDate}/${date.getMonth()}/${date.getFullYear()}`
        },
        localId
      });
  
      navigation.goBack()
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Address</Text>
      {location ? (
        <>
          <Text style={styles.text}>
            Lat: {location.latitude}, long: {location.longitude}.
          </Text>
          <MapPreview location={location} />
          <Text style={styles.address}>Formatted address: {address}</Text>
          <Pressable
            onPress={onConfirmAddress}
            style={({ pressed }) => [
              styles.btn,
              { opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Text style={styles.btnTexto}>Confirm address</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.noLocationContainer}>
            <Text>{error}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  text: {
    paddingTop: 20,
    fontFamily: "SecundariaFont",
    fontSize: 18,
  },
  noLocationContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: colors.green300,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    padding: 10,
    fontSize: 16,
  },
});
