import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export function PostsList({ navigation, posts }) {
  const [likes, setLikes] = useState(0);

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
                navigation.navigate("Comments", { photo: item.photo })
              }
            >
              <Feather
                name="message-circle"
                size={24}
                style={{ marginRight: 6, color: "#FF6C00" }}
              />
              <Text style={styles.text}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginRight: "auto" }]}
              activeOpacity={0.8}
              onPress={() => setLikes(likes + 1)}
            >
              <Feather
                name="thumbs-up"
                size={24}
                style={{ marginRight: 6, color: "#FF6C00" }}
              />
              <Text style={styles.text}>{likes}</Text>
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
