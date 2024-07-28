import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import { colors } from "../global";

import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  incrementToAmount,
} from "../features/Counter/CounterSlice";

import { Entypo } from "@expo/vector-icons";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const [inputToAdd, setInputToAdd] = useState(0);

  const handleDecrement = () => {
    dispatch(decrement());
    setInputToAdd(count - 1);
  };

  const handleIncrement = () => {
    dispatch(increment());
    setInputToAdd(count + 1);
  };

  const handleIncrementToAmount = (valor) => {
    dispatch(incrementToAmount(Number(valor)));
    setInputToAdd(valor);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.buttonCounter }}
          onPress={handleDecrement}
          disabled={count <= 0}
        >
          <Entypo name="minus" size={20} color="black" />
        </TouchableOpacity>
        <TextInput
          value={String(inputToAdd)}
          onChangeText={(valor) => handleIncrementToAmount(valor)}
          keyboardType="numeric"
          placeholder={'Seleccione cantidad'}
          style={styles.spanInput}
        />
        <TouchableOpacity
          style={{ ...styles.button, ...styles.buttonCounter }}
          onPress={handleIncrement}
        >
          <Entypo name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: colors.secundario,
  },
  buttonCounter: {
    borderRadius: 5,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  span: {
    backgroundColor: colors.cards,
    width: "60%",
    padding: 10,
    textAlign: "center",
    fontSize: 20,
    color: colors.primario,
  },
  spanInput: {
    backgroundColor: colors.cards,
    width: "60%",
    padding: 10,
    textAlign: "center",
    fontSize: 16,
    color: colors.textoOscuro,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "SecundariaFont",
  },
});

{
  /* 
<View style={styles.buttonsContainer}>
  
  <Pressable
    style={styles.button}
    onPress={() => {
      dispatch(incrementByAmount(Number(inputToAdd)));
      setInputToAdd("");
    }}
  >
    <Text style={styles.buttonText}>Add</Text>
  </Pressable>
</View>
<Pressable style={styles.button} onPress={() => dispatch(reset())}>
  <Text style={styles.buttonText}>Reset</Text>
</Pressable> */
}
