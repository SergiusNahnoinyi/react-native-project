import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import MainScreen from "./screens/main/MainScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import ProfileScreen from "./screens/main/ProfileScreen";

const AuthStack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

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
    <NavigationContainer>
      {!isAuthorised ? (
        <AuthStack.Navigator initialRouteName="Registration">
          <AuthStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              headerShown: false,
            }}
          />
          <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        </AuthStack.Navigator>
      ) : (
        <BottomTab.Navigator>
          <BottomTab.Screen name="Main" component={MainScreen} />
          <BottomTab.Screen name="Create posts" component={CreatePostsScreen} />
          <BottomTab.Screen name="Profile" component={ProfileScreen} />
        </BottomTab.Navigator>
      )}
    </NavigationContainer>
  );
}
