import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userAvatar: null,
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
      userAvatar: payload.avatar,
      userName: payload.name,
      userEmail: payload.email,
    }),
    updateUserAvatar: (state, { payload }) => ({
      ...state,
      userAvatar: payload.avatar,
    }),
    changeStatus: (state, { payload }) => ({
      ...state,
      isAuthorized: payload.isAuthorized,
    }),
    signOutUser: () => initialState,
  },
});
