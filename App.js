import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";

import { AuthStackNavigator } from "./components/AuthStackNavigator";
import { BottomTabNavigator } from "./components/BottomTabNavigator";
import { store } from "./redux/store";

export default function App() {
  const [isAuthorised, setIsAuthorised] = useState(true);

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
        {!isAuthorised ? <AuthStackNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>
    </Provider>
  );
}
