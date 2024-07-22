import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    value: {
      categorySelected: "",
      ItemSelected: "",
    },
  },
  reducers: {
    setCategorySelected: (state, action) => {
      state.value.categorySelected = action.payload;
    },
    setItemSelected: (state, action) => {
      state.value.ItemSelected = action.payload;
    },
  },
});

export const { setCategorySelected, setItemSelected } = shopSlice.actions;
export default shopSlice.reducer;
