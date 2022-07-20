import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  avatar: null,
  userName: null,
  userEmail: null,
  isAuthorized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.id,
      avatar: payload.avatar,
      userName: payload.name,
      userEmail: payload.email,
    }),
    changeStatus: (state, { payload }) => ({
      ...state,
      isAuthorized: payload.isAuthorized,
    }),
    signOutUser: () => initialState,
  },
});
