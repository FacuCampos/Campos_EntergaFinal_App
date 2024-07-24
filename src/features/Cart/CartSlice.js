import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      user: "userIdLogged",
      updatedAt: new Date().toLocaleString("es"),
      total: null,
      items: [],
    },
  },
  reducers: {
    addCartItem: (state, { payload }) => {
      const productRepeated = state.value.items.find(
        (item) => item.id === payload.id
      );
      if (productRepeated) {
        const itemsUpdated = state.value.items.map((item) => {
          if (item.id === payload.id) {
            item.cantidad += payload.cantidad;
            return item;
          }
          return item;
        });
        const total = itemsUpdated.reduce(
          (acc, currentItem) =>
            (acc += currentItem.precio * currentItem.cantidad),
          0
        );
        state.value = {
          ...state.value,
          items: itemsUpdated,
          total,
          updatedAt: new Date().toLocaleString("es"),
        };
      } else {
        state.value.items.push(payload);
        const total = state.value.items.reduce(
          (acc, currentItem) =>
            (acc += currentItem.precio * currentItem.cantidad),
          0
        );
        state.value = {
          ...state.value,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      }
    },
    removeCartItem: (state, { payload }) => {},
    deleteCart: (state) => {
      state.value = {
      ...state.value,
      items: [],
      total: null
      }
    },
  },
});

export const { addCartItem, removeCartItem, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
