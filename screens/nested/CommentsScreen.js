import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import { CommentsList } from "../../components/CommentsList";

export function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const { userName, userEmail } = useSelector((state) => state.auth);
  const { postId, postPhoto, postComments } = route.params;

  const hideKeyboard = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const writeCommentToDatabase = async () => {
    if (comment) {
      const docRef = doc(db, "posts", postId);

      await updateDoc(docRef, {
        comments: [
          ...comments,
          {
            comment: comment,
            userEmail,
            userName,
            date: Date.now(),
          },
        ],
      });
    }
  };

  const handleSubmit = () => {
    writeCommentToDatabase();
    setComments((prevState) => [...prevState, comment]);
    setComment("");
    hideKeyboard();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: postPhoto }} />
        <CommentsList comments={comments} />
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
    height: 240,
    marginBottom: 32,
    borderRadius: 8,
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
