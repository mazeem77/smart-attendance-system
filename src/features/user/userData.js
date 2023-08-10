// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  jwt: null,
  teamId: null,
  userDetails: {
    username: "Player",
    isCaptain: false,
  }
};

const userData = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.count++;
    },
    decrement: state => {
      state.count--;
    },
    setJwt: (state, action) => {
      state.jwt = action.payload;
    },
    setTeamId: (state, action) => {
      state.teamId = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    deleteAll: state => {
      state.count = 0;
      state.jwt = null;
      state.teamId = null;
      state.userDetails = {
        username: "Player",
        is_captain: false,
      }
    }
  },
});

export const { increment, decrement, deleteAll, setJwt, setTeamId, setUserDetails } = userData.actions;

export default userData.reducer;
