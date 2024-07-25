import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../global/colors";

const OrderItem = ({ order }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{order.date}</Text>
        {order.items.map((el, idx) => {
          return (
            <Text key={el.titulo + idx} style={styles.text}>
              {el.titulo}
            </Text>
          );
        })}
        <Text style={styles.text2}>${order.total}</Text>
      </View>
      <Feather name="search" size={30} color="black" />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.cards,
    shadowColor: "black",
    borderRadius: 20,

    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "SecundariaFont",
    fontSize: 17,
    color: "black",
    marginBottom: 5
  },
  text2: {
    fontFamily: "SecundariaFont",
    fontSize: 19,
    color: "gray",
  },
});
