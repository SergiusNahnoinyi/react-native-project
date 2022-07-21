import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import { logOut } from "../../redux/auth/authOperations";
import { PostsList } from "../../components/PostsList";

export function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { userName, userId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsersPosts();
  }, []);

  const getAllUsersPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));

    onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
      );
    });
  };

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
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            onPress={() => dispatch(logOut())}
          >
            <MaterialIcons name="logout" size={24} color={"#BDBDBD"} />
          </TouchableOpacity>
          <Text style={styles.profileTitle}>{userName}</Text>
          <PostsList posts={posts} navigation={navigation} />
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
    flex: 1,
    paddingTop: 92,
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
});
