import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 7 },
  reducers: {
    up: (state) => {
      state.count += 1;
    },
    down: (state) => {
      state.count -= 1;
    },
    reset2: (state) => {
      state.count = 7;
    },
    reset: (state) => {
      state.count = 7;
    }
  },
});

export const { up, down, reset2, reset } = counterSlice.actions;
export default counterSlice.reducer;