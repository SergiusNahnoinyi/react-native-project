import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";

import { MainScreen, CreatePostsScreen, ProfileScreen } from "../../screens/main";

const BottomTab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
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
          headerShown: false,
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
          tabBarHideOnKeyboard: true,
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
  );
}
