import React, { useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";

import { signUp } from "../../redux/auth/authOperations";

export function RegistrationScreen({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [isInputFocused, setIsInputFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    if (avatar === null) {
      return;
    }
    uploadAvatarToStorage();
  }, [avatar]);

  const dispatch = useDispatch();

  const pickAvatar = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  const uploadAvatarToStorage = async () => {
    const response = await fetch(avatar);
    const file = await response.blob();
    const fileName = Date.now().toString();
    const storageRef = ref(storage, `avatars/${fileName}`);

    await uploadBytes(storageRef, file);
    const avatarUrl = await getDownloadURL(storageRef);

    setAvatarURL(avatarUrl);
  };

  const handleInputFocus = (textInput) => {
    setIsInputFocused({
      [textInput]: true,
    });
  };

  const handleInputBlur = (textInput) => {
    setIsInputFocused({
      [textInput]: false,
    });
  };

  const hideKeyboard = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    dispatch(signUp({ name, email, password, avatarURL }));
    setName("");
    setEmail("");
    setPassword("");
    setAvatar(null);
    setAvatarURL("");
    hideKeyboard();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/backgroung.jpg")}
          style={styles.imageBackground}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "position" : ""}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isKeyboardShown ? 16 : 78,
              }}
            >
              <View style={styles.avatarContainer}>
                <Image style={styles.avatarImage} source={{ uri: avatar }} />
                <TouchableOpacity
                  style={styles.avatarButton}
                  activeOpacity={0.5}
                  onPress={pickAvatar}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={25}
                    color={"#FF6C00"}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.formTitle}>Create your account</Text>
              <TextInput
                style={[
                  styles.input,
                  isInputFocused.name && styles.inputFocused,
                ]}
                placeholder="Name"
                textContentType="name"
                value={name}
                onFocus={() => {
                  setIsKeyboardShown(true);
                  handleInputFocus("name");
                }}
                onBlur={() => handleInputBlur("name")}
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                style={[
                  styles.input,
                  isInputFocused.email && styles.inputFocused,
                ]}
                placeholder="Email"
                textContentType="emailAddress"
                value={email}
                onFocus={() => {
                  setIsKeyboardShown(true);
                  handleInputFocus("email");
                }}
                onBlur={() => handleInputBlur("email")}
                onChangeText={(text) => setEmail(text)}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    { marginBottom: 0 },
                    isInputFocused.password && styles.inputFocused,
                  ]}
                  placeholder="Password"
                  textContentType="password"
                  value={password}
                  secureTextEntry={passwordVisibility}
                  onFocus={() => {
                    setIsKeyboardShown(true);
                    handleInputFocus("password");
                  }}
                  onBlur={() => handleInputBlur("password")}
                  onChangeText={(text) => setPassword(text)}
                />
                <Pressable
                  style={styles.passwordVisibilityButton}
                  onPress={handlePasswordVisibility}
                >
                  <MaterialCommunityIcons
                    name={rightIcon}
                    size={22}
                    color="#1B4371"
                  />
                </Pressable>
              </View>
              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.5}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                  hideKeyboard();
                }}
                activeOpacity={0.5}
              >
                <Text style={styles.loginLink}>
                  Do you already have an account? Log in
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  form: {
    paddingTop: 92,
    paddingBottom: 78,
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
    transform: [{ translateX: 13.5 }],
  },
  formTitle: {
    marginBottom: 32,
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 43,
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  inputFocused: {
    backgroundColor: "white",
    borderColor: "orange",
  },
  passwordVisibilityButton: {
    position: "absolute",
    bottom: 12.5,
    right: 16,
  },
  submitButton: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
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
  loginLink: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
