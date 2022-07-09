import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { Ionicons, Feather } from "@expo/vector-icons";

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
        <BottomTab.Navigator
          initialRouteName={MainScreen}
          screenOptions={{
            headerShown: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              fontSize: 17,
              lineHeight: 22,
            },
            tabBarStyle: {
              height: 83,
              alignItems: "center",
              paddingTop: 9,
              paddingBottom: 34,
            },
            tabBarItemStyle: {
              maxHeight: 40,
              maxWidth: 70,
              borderRadius: 20,
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: "white",
            tabBarActiveBackgroundColor: "#FF6C00",
          }}
        >
          <BottomTab.Screen
            name="Main"
            component={MainScreen}
            options={{
              headerShown: true,
              tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name="grid-outline" size={24} color={color} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Create posts"
            component={CreatePostsScreen}
            options={{
              headerShown: true,
              tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name="add-outline" size={24} color={color} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, size, color }) => (
                <Feather name="user" size={24} color={color} />
              ),
            }}
          />
        </BottomTab.Navigator>
      )}
    </NavigationContainer>
  );
}
