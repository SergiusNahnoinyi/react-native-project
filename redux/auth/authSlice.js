import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  avatar: null,
  name: null,
  email: null,
  isAuthorized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
