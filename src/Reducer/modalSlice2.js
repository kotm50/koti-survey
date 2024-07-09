import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal2",
  initialState: {
    oneDay: "N",
    lastOpen: "",
  },
  reducers: {
    dayModal2: (state, action) => {
      state.oneDay = action.payload.oneDay;
      state.lastOpen = action.payload.lastOpen;
    },
  },
});

export const { dayModal2 } = modalSlice.actions;
export default modalSlice.reducer;
