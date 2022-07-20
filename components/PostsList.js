import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export function PostsList({ navigation, posts }) {
  const { userId } = useSelector((state) => state.auth);

  const setLike = async (postId, likes) => {
    const user = likes.find((user) => user === userId);

    if (!user) {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, {
        likes: [...likes, userId],
      });
    }
  };

  return (
    <FlatList
      style={styles.postsList}
      data={posts}
      keyExtractor={(post, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.postsItem}>
          <Image style={styles.image} source={{ uri: item.photo }} />
          <Text style={styles.postsDescription}>{item.photoName}</Text>
          <View style={styles.postsThumb}>
            <TouchableOpacity
              style={[styles.button, { marginRight: 24 }]}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Comments", {
                  postPhoto: item.photo,
                  postId: item.postId,
                  postComments: item.comments,
                })
              }
            >
              <Feather
                name="message-circle"
                size={24}
                style={{
                  marginRight: 6,
                  color: item.comments < 1 ? "#BDBDBD" : "#FF6C00",
                }}
              />
              <Text style={styles.text}>{item.comments.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginRight: "auto" }]}
              activeOpacity={0.8}
              onPress={() => setLike(item.postId, item.likes)}
            >
              <Feather
                name="thumbs-up"
                size={24}
                style={{
                  marginRight: 6,
                  color: item.likes < 1 ? "#BDBDBD" : "#FF6C00",
                }}
              />
              <Text style={styles.text}>{item.likes.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Maps", {
                  location: item.location,
                  latitude: item.latitude,
                  longitude: item.longitude,
                })
              }
            >
              <Feather
                name="map-pin"
                size={24}
                color={"#BDBDBD"}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.text, { textDecorationLine: "underline" }]}>
                {item.location}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  postsList: {
    width: "100%",
  },
  postsItem: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  postsDescription: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
  },
  postsThumb: {
    flexDirection: "row",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
  },
});
