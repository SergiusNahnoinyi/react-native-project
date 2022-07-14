import React, { useState } from "react";
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

import { CommentsList } from "../../components/CommentsList";

export function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const hideKeyboard = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    console.log(comment);
    setComments((prevState) => [...prevState, comment]);
    setComment("");
    hideKeyboard();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: route.params.photo }} />
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
