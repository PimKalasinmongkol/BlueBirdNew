import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const UploadImageScreen = ({route}) => {
  const {postId ,postTitle} = route.params;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState('');
  const [title ,setTitle] = useState(postTitle);

  const selectImageAndUpload = async () => {
    // Ensure permission for accessing the library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Optional, depending on your needs
      aspect: [1, 1], // Optional, aspect ratio
      quality: 1, // Optional, quality of the image
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      const uriParts = result.uri.split("/");
      const fileName = uriParts[uriParts.length - 1];

      Alert.alert("Image Selected!", fileName);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    const uriParts = imageUri.split("/");
    const fileName = uriParts[uriParts.length - 1];
    
    formData.append('id', postId);
    formData.append('title', title);
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg", // change as needed
      name: fileName,
    });

    try {
      const response = await fetch("http://192.168.94.10:4000/editPost", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      Alert.alert("Image Upload Success!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 30,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          marginTop: 30,
          backgroundColor: "#fff",
          backgroundColor: "#00007e",
        }}
      >
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="arrow-back-outline" size={30} color="#F1C40F" />
        </TouchableOpacity>
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={selectImageAndUpload}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginRight: 10,
          }}
        >
          Title{" "}
        </Text>
        <TextInput
          style={{
            fontSize: 16,
            fontWeight: "bold",
            padding: 10,
            width: "60%",
            borderBottomColor: "#333",
            borderBottomWidth: 1,
          }}
          value={title}
          onChangeText={(value) => setTitle(value)}
          />
      </View>
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
      <Text style={{
        alignSelf: "center",
        fontSize: 15,
        marginTop: 20,
      }}>Post ID: {postId}</Text>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.button_nav}
          onPress={() => navigation.navigate("Home")}
          >
          <FontAwesome name="home" size={26} color="#F1C40F" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button_nav}
          onPress={() => navigation.navigate("Search")}
        >
          <FontAwesome name="search" size={26} color="#F1C40F" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button_nav}
          onPress={() => navigation.navigate("Post")}
          >
          <FontAwesome name="file-photo-o" size={26} color="#F1C40F" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button_nav}
          onPress={() => navigation.navigate("Profile")}
        >
          <FontAwesome name="user-circle-o" size={26} color="#F1C40F" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //borderWidth: 2,
    paddingLeft: 70,
    paddingRight: 70,
    paddingVertical: 30,
    backgroundColor: "#00007e",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    marginTop: 20,
    marginBottom: 30,
    width: 300,
    height: 300,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default UploadImageScreen;
