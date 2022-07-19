import React, { useState } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";

import { store } from "./redux/store";

import { NavigationSwitch } from "./components/Navigation/NavigationSwitch";

export default function App() {
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
      <NavigationSwitch />
    </Provider>
  );
}
