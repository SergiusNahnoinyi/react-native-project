import { initializeApp } from "firebase/app";
import { API_KEY, SENDER_ID, APP_ID } from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "react-native-project-de2c0.firebaseapp.com",
  projectId: "react-native-project-de2c0",
  storageBucket: "react-native-project-de2c0.appspot.com",
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);
