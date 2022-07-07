import { StyleSheet, View, Text } from "react-native";

export default function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CreatePostsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
  },
});
