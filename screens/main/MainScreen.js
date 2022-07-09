import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MainScreen</Text>
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
