import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function CreatePostsScreen() {
  const [imageName, setImageName] = useState("");
  const [location, setLocation] = useState("");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const hideKeyboard = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    console.log(imageName, location);
    setImageName("");
    setLocation("");
    hideKeyboard();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <View style={styles.contentBlock}>
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.addPhotoButton} activeOpacity={0.8}>
              <Ionicons name="camera" size={24} color={"grey"} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Download a photo</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Image name"
            textContentType="name"
            value={imageName}
            onChangeText={(text) => setImageName(text)}
          />
          <View style={styles.inputContainer}>
            <Feather name="map-pin" size={24} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { marginBottom: 0, paddingLeft: 32 }]}
              placeholder="Location"
              textContentType="location"
              value={location}
              onChangeText={(text) => setLocation(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  contentBlock: {
    marginBottom: 32,
  },
  photoContainer: {
    height: 240,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
  },
  addPhotoButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "white",
  },
  subtitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 32,
  },
  inputIcon: {
    position: "absolute",
    top: 13,
    color: "#BDBDBD",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  submitButton: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  submitButtonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "white",
  },
});
