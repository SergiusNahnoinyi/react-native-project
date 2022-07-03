import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  Button,
} from "react-native";

export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/backgroung.jpg")}
        style={styles.image}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Registration</Text>
          <TextInput style={styles.input} placeholder="Login" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
          />
          <Button title={"Sign up"} style={styles.button} />
          <Text style={styles.text}>
            Do you already have an account? Sign in
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {},
  title: {},
  input: {},
  button: {},
  text: {},
});
