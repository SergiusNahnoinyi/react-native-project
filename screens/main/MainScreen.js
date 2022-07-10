import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PostsScreen, CommentsScreen } from "../nested";

const NestedStack = createNativeStackNavigator();

export function MainScreen() {
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
      <NestedStack.Screen name="Posts" component={PostsScreen} />
      <NestedStack.Screen name="Comments" component={CommentsScreen} />
    </NestedStack.Navigator>
  );
}
