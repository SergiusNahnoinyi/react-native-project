import { StyleSheet, View, Text } from "react-native";

export function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MapScreen</Text>
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
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
  },
});
