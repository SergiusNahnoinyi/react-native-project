import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signUp =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };
