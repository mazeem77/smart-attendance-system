// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = { menu: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { setMenu } = counterSlice.actions;

export default counterSlice.reducer;
