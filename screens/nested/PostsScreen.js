import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { db } from "../../firebase/config";
import { PostsList } from "../../components/PostsList";

export function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("date", "desc"));

    onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.avatarImage}
          source={require("../../assets/images/avatar.jpg")}
        />
        <View style={styles.user}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <PostsList posts={posts} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
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
