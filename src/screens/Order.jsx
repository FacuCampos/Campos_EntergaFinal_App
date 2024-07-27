import { FlatList } from "react-native";
import React from "react";
import { colors } from "../global/colors";
import { useGetOrdersByUserQuery } from "../services/shopServices";
import { OrderItem } from "../components";

const Order = () => {
  const { data: orderData } = useGetOrdersByUserQuery("mail@mail.com");

  return (
    <FlatList
      data={orderData}
      keyExtractor={(orderItem, idx) => orderItem.user + idx}
      contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
      showsVerticalScrollIndicator={false}
      renderItem={(order) => {
        return <OrderItem order={order.item} />;
      }}
    />
  );
};

export default Order;