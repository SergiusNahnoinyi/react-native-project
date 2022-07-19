import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { logOut } from "../../redux/auth/authOperations";

import { PostsScreen, CommentsScreen, MapScreen } from "../nested";

const NestedStack = createNativeStackNavigator();

export function MainScreen({ navigation, route }) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === "Comments" || routeName === "Maps") {
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

  const dispatch = useDispatch();

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
              onPress={() => dispatch(logOut())}
            >
              <MaterialIcons name="logout" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedStack.Screen name="Comments" component={CommentsScreen} />
      <NestedStack.Screen name="Maps" component={MapScreen} />
    </NestedStack.Navigator>
  );
}
