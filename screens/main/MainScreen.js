import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
