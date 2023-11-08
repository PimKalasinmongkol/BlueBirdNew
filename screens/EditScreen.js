import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { themeColors } from "../theme";
import { SignOut } from "../hooks/useAuth";
import { updateEmailAndPassword } from "../hooks/useAuth";
import * as ImagePicker from "expo-image-picker";
import Images from '../createImageImport'

export default function EditScreen() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userId, setUserId] = useState(null);
  const [image ,setImage] = useState(null);
  const [items, setItems] = useState({});
  const [isEdited , setIsEdited] = useState(false);

  const navigation = useNavigation();
  const handleLogout = () => {
    SignOut(success, unsuccess);
  };

  const success = (msg) => {
    Alert.alert(` ${msg} `);
    navigation.push("Welcome");
  };

  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };

  const getSession = async () => {
    const response = await fetch("http://192.168.94.10:4000/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserId(data.id);
  };

  const fetchEditUser = async () => {
    const response = await fetch(
      `http://192.168.94.10:4000/getEditWithUserId`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setName(data[0].name);
    setEmail(data[0].email);
    setPassword(data[0].password);
    setUserId(data[0].id);
    setImage(data[0].photoURL);
  };

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
      setImage(result.uri);
      const uriParts = result.uri.split("/");
      const fileName = uriParts[uriParts.length - 1];

      Alert.alert("Image Selected!", fileName);
    }
  };

  const SendDataEditedUser = async () => {
    const formData = new FormData();
    const uriParts = image.split("/");
    const fileName = uriParts[uriParts.length - 1];

    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: fileName,
    });
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
        const response = await fetch(
          `http://192.168.94.10:4000/editUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: formData
          }
        );
        const data = await response.json();
        updateEmailAndPassword(email, password, success, unsuccess);
        setIsEdited(!isEdited);
        Alert.alert("Update data successfully");
    } catch (error) {
        console.error('Error send edit data:', error);
    }
  };

  useEffect(() => {
    getSession();
    fetchEditUser();
  }, [isEdited]);

  return (
    <SafeAreaView style={{ flex: 12, backgroundColor: themeColors.bg }}>
      <View style={styles.navBar}>
        <Text style={{ fontWeight: "bold", fontSize: 30, color: "#F1C40F" }}>
          BlueBird
        </Text>
        <TouchableOpacity style={{}} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={30} color="#F1C40F" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 10,
          marginLeft: "10%",
          marginRight: "10%",
          justifyContent: "center",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={Images[image]}
              style={{ width: 150, height: 150, borderRadius: 100 }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#00A6FF",
                padding: 10,
                margin: 10,
                borderRadius: 10,
                width: 100,
                alignItems: "center",
                marginLeft: 80,
              }}
              onPress={selectImageAndUpload}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>Upload</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text>Name</Text>
            <TextInput
              style={styles.textinp}
              value={name}
              onChangeText={(value) => setName(value)}
            />
          </View>
          <View>
            <Text>Email</Text>
            <TextInput
              style={styles.textinp}
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
                secureTextEntry={true}
              style={styles.textinp}
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#F1C40F",
              padding: 10,
              margin: 10,
              borderRadius: 10,
              width: 100,
              alignItems: "center",
            }}
            onPress={SendDataEditedUser}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#E34D4D",
              padding: 10,
              margin: 10,
              borderRadius: 10,
              width: 100,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.button_nav}
          onPress={() => navigation.navigate("Home")}
        >
          <FontAwesome name="home" size={26} color="#F1C40F" />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#00007e",
  },
  button_nav: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  postContainer: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 10,
  },
  textinp: {
    backgroundColor: "#C7C7C7",
    width: 200,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 15,
  },
});
