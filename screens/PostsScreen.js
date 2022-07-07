import { StyleSheet, View, Image, Text } from "react-native";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.avatarImage}
          source={require("../assets/images/avatar.jpg")}
        />
        <View style={styles.user}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
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
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarImage: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121CC",
  },
});
