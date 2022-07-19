import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import { changeUserStatus } from "./redux/auth/authOperations";
import { store } from "./redux/store";

import { AuthStackNavigator } from "./components/AuthStackNavigator";
import { BottomTabNavigator } from "./components/BottomTabNavigator";

export default function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    dispatch(changeUserStatus());
  }, []);

  const [loaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {!isAuthorized ? <AuthStackNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>
    </Provider>
  );
}
