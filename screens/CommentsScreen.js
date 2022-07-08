import { StyleSheet, View, Text } from "react-native";

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CommentsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
});
