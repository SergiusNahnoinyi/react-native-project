import React, { useState, useEffect } from "react";
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

  const { userName, userEmail, userAvatar } = useSelector(
    (state) => state.auth
  );
  const { postId, postPhoto, postComments } = route.params;

  useEffect(() => {
    getAllComments();
  }, []);

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
            userAvatar,
            date: new Date().toLocaleString(),
          },
        ],
      });
    }
  };

  const getAllComments = async () => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    setComments(docSnap.data().comments);
  };

  const handleSubmit = () => {
    writeCommentToDatabase();
    getAllComments();
    setComment("");
    hideKeyboard();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: postPhoto }} />
        <CommentsList comments={comments} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : ""}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
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
              activeOpacity={0.5}
              onPress={handleSubmit}
            >
              <AntDesign name="arrowup" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
