import { StyleSheet, View, Image, Text, FlatList } from "react-native";

export function CommentsList({ comments }) {
  return (
    <FlatList
      style={styles.commentsList}
      data={comments}
      keyExtractor={(comment, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.commentsItem}>
          <Image
            style={styles.userAvatar}
            source={require("../assets/images/avatar.jpg")}
          />
          <View style={styles.commentsThumb}>
            <Text style={styles.commentsText}>{item}</Text>
            <Text style={styles.commentsDate}>
              {new Date().toLocaleString()}
            </Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  commentsList: {
    marginBottom: 31,
  },
  commentsItem: {
    marginBottom: 24,
    flexDirection: "row",
  },
  userAvatar: {
    width: 28,
    height: 28,
    marginRight: 16,
    borderRadius: 50,
  },
  commentsThumb: {
    flex: 1,
    padding: 16,
    borderRadius: 6,
    backgroundColor: "#00000008",
  },
  commentsText: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  commentsDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
    color: "#BDBDBD",
  },
});
