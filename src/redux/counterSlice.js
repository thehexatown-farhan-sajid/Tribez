import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bidsModal: false,
  buyModal: false,
  defaultAccount: null,
  userBalance: [],
  cardid: 0,
  addresswallet: "",
  owneraddress: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCardId: (state, action) => {
      state.cardid = action.payload;
    },
    setAddress: (state, action) => {
      state.addresswallet = action.payload;
    },
    setOwnerAddress: (state, action) => {
      state.owneraddress = action.payload;
    },
    setDefaultAccount: (state, action) => {
      state.defaultAccount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserBalance,
  setDefaultAccount,
  setOwnerAddress,
  setCardId,
  setAddress,
} = counterSlice.actions;

export default counterSlice.reducer;
