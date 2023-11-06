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
import { Ionicons } from "@expo/vector-icons";
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
  const [userId, setUserId] = useState([]);
  const [search, setSearch] = useState("");

  const [allUser, setAllUser] = useState([]);
  const [allLike, setAllLike] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [comment ,setComment] = useState("");

  const getSession = async () => {
    const response = await fetch("http://192.168.94.10:4000/getEditWithUserId", {
      method: "GET",
    });
    const data = await response.json();
    setUserId(data[0]);
    console.log("user id", userId.id);
  };

  const fetchPost = async () => {
    //console.log('Beam',userId) ${userId}
    const response = await fetch(`http://192.168.94.10:4000/getPost`, {
      method: "GET",
    });
    const data = await response.json(); //lost data
    setItems(data);
  };

  const fetchLike = async () => {
    const response = await fetch(`http://192.168.94.10:4000/getLikes`, {
      method: "GET",
    });
    const data = await response.json(); //lost data
    setAllLike(data);
  };

  const fetchComment = async () => {
    const response = await fetch(`http://192.168.94.10:4000/getComment`, {
      method: "GET",
    });
    const data = await response.json(); //lost data
    setAllComment(data)
    allComment.map((item) => {
      console.log(item);
    })
  }

  const handleUserLiked = async (user_id, post_id) => {
    const isUserLikedPost = allLike.find((like) => {
      return like.user_id === user_id && like.post_id === post_id;
    });

    if (!isUserLikedPost) {
      try {
        const response = await fetch(`http://192.168.94.10:4000/addLike`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            post_id: post_id,
          }),
        });
        setIsLiked(!isLiked);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`http://192.168.94.10:4000/undoLike`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            post_id: post_id,
          }),
        });
        setIsLiked(!isLiked);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleComment = async (user_id ,post_id ,comment_content) => {
    if (comment_content.length === 0) {
      Alert.alert('Please enter your comment');
      return;
    }
    try {
      const response = await fetch(`http://192.168.94.10:4000/addComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          post_id: post_id,
          comment: comment_content,
        }),
      });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPost();
    fetchLike();
    fetchComment();
    getSession();
  }, [isLiked ,comment]);

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

  const renderPost = ({ item }) => {
    let countLike = 0;
    let countComment = 0;
    allLike.map((like) => {
      if (like.post_id === item.post_id) {
        countLike++;
      }
    })
    allComment.map((comment) => {
      if (comment.post_id === item.post_id) {
        countComment++;
      }
    })
    return (
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
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            justifyContent: 'flex-start'
          }}
        >
          <View style={{ flexDirection: "row", paddingHorizontal: 10}}>
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => handleUserLiked(userId.id, item.post_id)}
            >
              <AntDesign name="like1" size={24} color="black" />
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 16 }}>{countLike}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingHorizontal: 10}}>
            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
              <Ionicons name="chatbubble-ellipses" size={24} color="black" />
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 16 }}>{countComment}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "500px"
          }}
        >
          {
            allComment.map((comment) => {
              if (comment.post_id === item.post_id) {
                return (
                  <View style={{
                    borderRadius: 10,
                    marginVertical: 10,
                    width: "100%",
                    paddingVertical: 10,
                    paddingLeft: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eaeaea",
                  }}>
                    <Text style={{
                      textAlign:'left',
                      fontSize: 19,
                      fontWeight: 800,
                    }}>{comment.name}</Text>
                    <Text style={{
                      textAlign:'left',
                      fontSize: 17,
                      fontWeight: 500,
                    }}>{comment.comment_content}</Text>
                  </View>
                )
              }
            })
          }
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginVertical: 10,
          }}
        >
          <TextInput
            style={{
              fontSize: 20,
              fontWeight: "bold",
              width: "90%",
              height: 50,
              borderBottomColor: "#333",
              borderBottomWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 50,
              borderWidth: 1,
              borderBlockColor: "#333",
              backgroundColor: "#333",
              marginLeft: 15,
            }}
            onPress={() => handleComment(userId.id, item.post_id, comment)}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

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
          data={items.filter((item) =>
            item.post_title.toLowerCase().includes(search.toLowerCase())
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
