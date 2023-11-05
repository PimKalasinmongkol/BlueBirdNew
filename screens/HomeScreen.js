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
import { SignOut } from "../hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import {
  Card,
  Title,
  Paragraph,
  Divider,
  Searchbar,
  Avatar,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState("");

  const [countLiked, setCountLiked] = React.useState(0);
  const [comment, setcomment] = React.useState(false);
  const [countComment, setCountComment] = React.useState(0);

  function handleLiked() {
    setCountLiked(countLiked + 1);
  }
  function handleComment() {
    setcomment(!comment);
    setCountComment(countComment + 1);
  }

  const getSession = async () => {
    const response = await fetch("http://192.168.94.10:4000/session", {
      method: "GET",
    });
    const data = await response.json();
    setUserId(data.id);
  };

  const fetchPost = async () => {
    //console.log('Beam',userId) ${userId}
    const response = await fetch(
      `http://192.168.94.10:4000/getPost`,
      {
        method: "GET",
      }
    );
    const data = await response.json(); //lost data
    setItems(data);
  };

  useEffect(() => {
    getSession();
    fetchPost();
  }, []);

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

  const renderPost = ({ item }) => (
    <Card
      style={{
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "5%",
        paddingBottom: "5%",
      }}
      key={item.post_id}
    >
      <Card.Title
        style={{ fontSize: 20 }}
        title={item.name}
        subtitle={item.post_date}
        left={() => {
          return <Avatar.Image source={{ uri: item.photoURL }} size={50} />;
        }}
      />
      <Card.Content>
        <Title>{item.post_title}</Title>
      </Card.Content>
      <View style={{ flexDirection: "row", paddingTop: "2%" }}>
        {item.post_img.length > 0 ? (
          <Card.Cover
            source={{ uri: item.post_img }}
            style={{ width: "100%", height: 500 }}
            key={item.post_img}
          />
        ) : (
          <View></View>
        )}
        <View></View>
      </View>
      <Card.Actions>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <AntDesign name="like1" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 16 }}>Like</Text>
          </View>
        </View>
      </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 12 }}>
      <View style={styles.navBar}>
        <Text style={{ fontWeight: "bold", fontSize: 30, color: "#F1C40F" }}>
          BlueBird
        </Text>
        <TouchableOpacity style={{}} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={30} color="#F1C40F" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 10 }}>
        <View style={styles.searchBox}>
          <FontAwesome
            style={{ paddingLeft: 30 }}
            name="search"
            size={24}
            color="black"
          />
          <TextInput
            style={{ padding: 10, fontSize: 20, fontWeight: "bold" }}
            placeholder="Search Me"
            onChangeText={(value) => setSearch(value)}
          />
        </View>
        <FlatList
          data={items.filter(
            item => item.post_title.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
        />
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
  username: {
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 500,
    resizeMode: "cover",
  },
  caption: {
    marginTop: 5,
  },
  likes: {
    color: "blue",
  },
  searchBox: {
    flexDirection: "row",
    justifyContent: "start",
    margin: 20,
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#B4B4B4",
  },
});
