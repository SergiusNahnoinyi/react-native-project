import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
