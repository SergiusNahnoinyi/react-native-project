import React, { useState } from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [isInputFocused, setIsInputFocused] = useState({
    email: false,
    password: false,
  });

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
    console.log(email, password);
    setEmail("");
    setPassword("");
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
              <Text style={styles.formTitle}>Log in to your account</Text>
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
                activeOpacity={0.8}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Registration");
                  hideKeyboard();
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.loginLink}>
                  Don't have an account? Sign up
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
    paddingTop: 32,
    paddingBottom: 78,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
  },
  formTitle: {
    marginBottom: 32,
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
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
