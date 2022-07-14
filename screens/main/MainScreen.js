import React, { useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { PostsScreen, CommentsScreen } from "../nested";

const NestedStack = createNativeStackNavigator();

export function MainScreen({ navigation, route }) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === "Comments") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          height: 83,
          alignItems: "center",
          paddingTop: 9,
          paddingBottom: 34,
        },
      });
    }
  }, [navigation, route]);

  return (
    <NestedStack.Navigator
      initialRouteName={PostsScreen}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
        },
      }}
    >
      <NestedStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ width: 24 }}
              activeOpacity={0.8}
              // onPress={}
            >
              <MaterialIcons name="logout" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedStack.Screen name="Comments" component={CommentsScreen} />
    </NestedStack.Navigator>
  );
}
