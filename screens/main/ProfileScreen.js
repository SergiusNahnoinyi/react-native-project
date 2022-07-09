import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

const DATA = [
  {
    id: "1",
    photo: "../../assets/images/sunset.jpg",
    description: "Sunset",
    location: "Kyiv",
    comments: "400",
    likes: "1400",
  },
  {
    id: "2",
    photo: "../../assets/images/forest.jpg",
    description: "Forest",
    location: "Lviv",
    comments: "395",
    likes: "1395",
  },
  {
    id: "3",
    photo: "../../assets/images/house.jpg",
    description: "House",
    location: "Venice",
    comments: "380",
    likes: "1380",
  },
];

const Item = ({ post }) => (
  <View style={styles.postsItem}>
    <Image
      style={styles.image}
      source={require("../../assets/images/house.jpg")}
    />
    <Text style={styles.postsDescription}>{post.description}</Text>
    <View style={styles.postsThumb}>
      <TouchableOpacity
        style={[styles.button, { marginRight: 24 }]}
        activeOpacity={0.8}
      >
        <Feather
          name="message-circle"
          size={24}
          style={{ marginRight: 6, color: "#FF6C00" }}
        />
        <Text style={styles.text}>{post.comments}</Text>
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
        <Text style={styles.text}>{post.likes}</Text>
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

export default function ProfileScreen() {
  const renderItem = ({ item }) => <Item post={item} />;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/backgroung.jpg")}
        style={styles.imageBackground}
      >
        <View style={styles.profile}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatarImage}
              source={require("../../assets/images/avatar.jpg")}
            />
            <TouchableOpacity style={styles.avatarButton} activeOpacity={0.8}>
              <Ionicons name="add-circle-outline" size={25} color={"#E8E8E8"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
            <MaterialIcons name="logout" size={24} color={"#BDBDBD"} />
          </TouchableOpacity>
          <Text style={styles.profileTitle}>Natalia Romanova</Text>
          <FlatList
            style={styles.profileList}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(post) => post.id}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    paddingTop: 147,
    resizeMode: "cover",
  },
  profile: {
    paddingTop: 92,
    paddingBottom: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
  },
  avatarContainer: {
    position: "absolute",
    top: -60,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatarButton: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 14,
    right: 0,
    transform: [{ translateX: 13.5 }, { rotate: "45deg" }],
  },
  logoutButton: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  profileTitle: {
    marginBottom: 32,
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
  },
  profileList: {
    width: "100%",
    marginBottom: 32,
  },
  postsItem: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
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
    // justifyContent: "space-between",
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
