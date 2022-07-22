import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import { authSlice } from "./authSlice";

export const signUp =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      dispatch(
        authSlice.actions.updateUserProfile({
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
        })
      );
    } catch (error) {
      alert(error.message);
    }
  };

export const signIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

export const logOut = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSlice.actions.signOutUser());
};

export const changeUserStatus = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          avatar: auth.currentUser.photoURL,
        })
      );
      dispatch(authSlice.actions.changeStatus({ isAuthorized: true }));
    }
  });
};

export const changeUsersAvatar = (avatar) => async (dispatch, getState) => {
  if (auth.currentUser !== null) {
    await updateProfile(auth.currentUser, {
      photoURL: avatar,
    });
  }
  dispatch(authSlice.actions.updateUserAvatar({ avatar: avatar }));
};
