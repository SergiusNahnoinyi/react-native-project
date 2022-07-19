import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const signUp =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await AsyncStorage.createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      alert(error.message);
    }
  };

export const signIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await AsyncStorage.signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      alert(error.message);
    }
  };
