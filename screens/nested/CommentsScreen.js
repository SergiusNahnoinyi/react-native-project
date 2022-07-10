import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const DATA = [
  {
    id: "1",
    text: "Lorem 1 lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    date: "06 June 2022 | 11:00",
  },
  {
    id: "2",
    text: "Lorem 2 lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    date: "07 June 2022 | 12:00",
  },
  {
    id: "3",
    text: "Lorem 3 lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    date: "08 June 2022 | 13:00",
  },
];

const Item = ({ comment }) => (
  <View style={styles.commentsItem}>
    <Image
      style={styles.userAvatar}
      source={require("../assets/images/avatar.jpg")}
    />
    <View style={styles.commentsThumb}>
      <Text style={styles.commentsText}>{comment.text}</Text>
      <Text style={styles.commentsDate}>{comment.date}</Text>
    </View>
  </View>
);

export default function CommentsScreen() {
  const [comment, setComment] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const hideKeyboard = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    console.log(comment);
    setComment("");
    hideKeyboard();
  };

  const renderItem = ({ item }) => <Item comment={item} />;

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/images/sunset.jpg")}
        />
        <FlatList
          style={styles.commentsList}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(comment) => comment.id}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isInputFocused && styles.inputFocused]}
            placeholder="Comment"
            textContentType="name"
            value={comment}
            onBlur={() => setIsInputFocused(false)}
            onFocus={() => setIsInputFocused(true)}
            onChangeText={(text) => setComment(text)}
          />
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <AntDesign name="arrowup" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    marginBottom: 32,
    borderRadius: 8,
  },
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
  inputContainer: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  inputFocused: {
    backgroundColor: "white",
    borderColor: "orange",
  },
  submitButton: {
    width: 34,
    height: 34,
    position: "absolute",
    right: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});
