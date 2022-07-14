import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

// const DATA = [
//   {
//     id: "1",
//     photo: "../../assets/images/sunset.jpg",
//     description: "Sunset",
//     location: "Kyiv",
//     comments: "400",
//     likes: "1400",
//   },
//   {
//     id: "2",
//     photo: "../../assets/images/forest.jpg",
//     description: "Forest",
//     location: "Lviv",
//     comments: "395",
//     likes: "1395",
//   },
//   {
//     id: "3",
//     photo: "../../assets/images/house.jpg",
//     description: "House",
//     location: "Venice",
//     comments: "380",
//     likes: "1380",
//   },
// ];

const Item = ({ post, navigation }) => (
  <View style={styles.postsItem}>
    <Image style={styles.image} source={{ uri: post.photo }} />
    <Text style={styles.postsDescription}>{post.photoName}</Text>
    <View style={styles.postsThumb}>
      <TouchableOpacity
        style={[styles.button, { marginRight: 24 }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Comments", { photo: post.photo })}
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
      >
        <Feather
          name="thumbs-up"
          size={24}
          style={{ marginRight: 6, color: "#FF6C00" }}
        />
        <Text style={styles.text}>0</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Feather
          name="map-pin"
          size={24}
          color={"#BDBDBD"}
          style={{ marginRight: 6 }}
        />
        <Text style={[styles.text, { textDecorationLine: "underline" }]}>
          {post.location}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const renderItem = ({ item }) => <Item post={item} navigation={navigation} />;

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
      <FlatList
        style={styles.profileList}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(post, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 32,
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
  profileList: {
    width: "100%",
    // marginBottom: 32,
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
