import { StyleSheet, Text, View } from "react-native";
import { colors } from "../global";

const OrderItem = ({ order }) => {
  return (
    <View style={styles.card}>
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
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: colors.cards,
    shadowColor: "black",
    borderRadius: 20,
    justifyContent: 'space-between',
    justifyContent: "flex-start",
    alignItems: "flex-start",

    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  text: {
    fontFamily: "SecundariaFont",
    fontSize: 17,
    color: "black",
    marginVertical: 5
  },
  text2: {
    width: '100%',
    fontFamily: "SecundariaFont",
    fontSize: 19,
    color: "gray",
    textAlign: 'right'
  },
});
