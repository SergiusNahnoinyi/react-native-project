import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export function Loader({ animate }) {
  return (
    <View
      style={[
        styles.container,
        styles.horizontal,
        animate === false && styles.hide,
      ]}
    >
      <ActivityIndicator
        size="large"
        color="#FF6C00"
        animating={animate}
        hidesWhenStopped={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  hide: {
    display: "none",
  },
});
