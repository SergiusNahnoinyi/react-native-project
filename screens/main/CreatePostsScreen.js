import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Ionicons, Feather } from "@expo/vector-icons";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/config";

export function CreatePostsScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [location, setLocation] = useState("");
  const [geoposition, setGeoposition] = useState("");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const { userId, userName } = useSelector((state) => state.auth);

  useEffect(() => {
    if (photo !== null) {
      uploadPhotoToStorage();
    }
  }, [photo]);

  useEffect(() => {
    (async () => {
      let cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");

      let locationPermission =
        await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null && hasLocationPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false || hasLocationPermission === false) {
    return <Text>No access to the camera or location</Text>;
  }

  const hideKeyboard = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.requestPermissionsAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setGeoposition(coords);
    }
  };

  const uploadPhotoToStorage = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const fileName = Date.now().toString();
    const storageRef = ref(storage, `photos/${fileName}`);

    await uploadBytes(storageRef, file);
    const photoUrl = await getDownloadURL(storageRef);

    setPhotoURL(photoUrl);
  };

  const uploadPostToDatabase = async () => {
    const { latitude, longitude } = geoposition;

    await addDoc(collection(db, "posts"), {
      userId,
      userName,
      photo: photoURL,
      photoName,
      location,
      latitude,
      longitude,
      comments: [],
      likes: [],
      date: new Date().toLocaleString(),
    });
  };

  const handleSubmit = () => {
    uploadPostToDatabase();
    navigation.navigate("Posts");
    hideKeyboard();
    setPhoto(null);
    setPhotoURL(null);
    setPhotoName("");
    setLocation("");
    setGeoposition("");
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" || "android" ? "position" : ""}
          keyboardVerticalOffset={100}
        >
          {!photo ? (
            <View style={styles.cameraContainer}>
              <Camera style={styles.camera} ref={setCameraRef}>
                <TouchableOpacity
                  style={styles.snapButton}
                  activeOpacity={0.5}
                  onPress={takePhoto}
                >
                  <Ionicons name="camera" size={24} color={"grey"} />
                </TouchableOpacity>
              </Camera>
              <Text style={styles.subtitle} onPress={takePhoto}>
                Download a photo
              </Text>
            </View>
          ) : (
            <View style={styles.previewContainer}>
              <ImageBackground
                source={{ uri: photo }}
                style={styles.previewPhoto}
              >
                <TouchableOpacity
                  style={styles.editButton}
                  activeOpacity={0.5}
                  onPress={() => setPhoto(null)}
                >
                  <Ionicons name="camera" size={24} color={"white"} />
                </TouchableOpacity>
              </ImageBackground>
              <Text style={styles.subtitle} onPress={() => setPhoto(null)}>
                Edit your photo
              </Text>
            </View>
          )}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Photo name"
              textContentType="name"
              value={photoName}
              onChangeText={(text) => setPhotoName(text)}
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
              style={{
                ...styles.submitButton,
                backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
              }}
              activeOpacity={0.5}
              onPress={handleSubmit}
              disabled={photo ? false : true}
            >
              <Text style={styles.submitButtonText}>Publish</Text>
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
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  cameraContainer: {
    marginBottom: 32,
  },
  camera: {
    height: 240,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  snapButton: {
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
  previewContainer: {
    marginBottom: 32,
  },
  previewPhoto: {
    height: 240,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#FFFFFF4D",
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
