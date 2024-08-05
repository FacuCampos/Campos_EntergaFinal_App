import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "../global";
import { FontAwesome5, FontAwesome6, AntDesign } from "@expo/vector-icons";

const Search = ({ onSearch = () => {}, goBack = () => {}, error = "" }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={keyword}
          onChangeText={setKeyword}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <Pressable style={styles.icons} onPress={() => onSearch(keyword)}>
        <FontAwesome5 name="search" size={24} color="black" />
      </Pressable>
      <Pressable style={styles.icons} onPress={() => setKeyword("")}>
        <FontAwesome6 name="eraser" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "start",
    gap: 18,
    marginTop: 20,
    marginBottom: 5
  },
  icons: {
    top: 10,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    width: 250,
    padding: 8,
    fontSize: 18,
    backgroundColor: colors.secundario,
    color: colors.fondo,
    borderRadius: 10,
  },
});
