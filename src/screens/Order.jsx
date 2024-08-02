import { FlatList } from "react-native";
import React from "react";
import { useGetOrdersByUserQuery } from "../services/shopServices";
import { OrderItem } from "../components";
import { useSelector } from "react-redux";

const Order = () => {

  const {user} = useSelector((state)=>state.auth.value)

  const { data: orderData } = useGetOrdersByUserQuery(user);

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