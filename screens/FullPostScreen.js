// FullPostScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Card, Avatar, Title } from "react-native-paper";
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Images from '../createImageImport'

const FullPostScreen = ({ route }) => {
  const navigation = useNavigation();
  const { postId, userId } = route.params;
  const [allComment, setCommentData] = useState([]);
  const [allLike, setLikeData] = useState([]);
  const [allPost, setPostData] = useState([]);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  var countLike = 0;
  var countComment = 0;

  const fetchPost = async () => {
    //console.log('Beam',userId) ${userId}
    const response = await fetch(`http://192.168.94.10:4000/getPost`, {
      method: "GET",
    });
    const data = await response.json(); //lost data
    const postThisScreen = data.filter((data) => data.post_id === postId);
    setPostData(postThisScreen);
  };

  const fetchLike = async () => {
    const response = await fetch(`http://192.168.94.10:4000/getLikes`, {
      method: "GET",
    });
    const data = await response.json(); //lost data
    setLikeData(data);
  };

  const fetchComment = async () => {
    const response = await fetch(`http://192.168.94.10:4000/getComment`, {
      method: "GET",
    });
    const data = await response.json(); //lost data
    setCommentData(data);
  };

  const deleteComment = async (comment_id) => {
    const response = await fetch(`http://192.168.94.10:4000/deleteComment` ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_id: comment_id,
      }),
    })
    const data = await response.json()
    setIsLiked(!isLiked);
  };

  // Function to handle liking a post
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

  // Function to handle adding a comment
  const handleComment = async (user_id, post_id, comment_content) => {
    if (comment_content.length === 0) {
      Alert.alert("Please enter your comment");
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
  };

  allLike.map((like) => {
    if (like.post_id === postId) {
      countLike++;
    }
  });
  allComment.map((comment) => {
    if (comment.post_id === postId) {
      countComment++;
    }
  });

  useEffect(() => {
    fetchLike();
    fetchComment();
    fetchPost();
  }, [isLiked, comment]);

  return (
    <View
      style={{
        marginTop: 30,
        overflow: "scroll",
        height: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 30,
          //borderWidth: 2,
          backgroundColor: "#00007e",
        }}
      >
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="arrow-back-outline" size={30} color="#F1C40F" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditPost', {
          postId: postId,
          postTitle: allPost[0].post_title
        })}>
          <FontAwesome name="edit" size={30} color='#F1C40F' />
        </TouchableOpacity>
      </View>
      {allPost.map((post) => (
        <Card
          style={{
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "5%",
            paddingBottom: "5%",
          }}
        >
          <Card.Title
            title={post.name}
            subtitle={post.post_date.slice(0 ,-5).replace('T'," ")}
            left={() => (
              <Avatar.Image source={Images[post.photoURL]} size={50} />
            )}
          />
          <Card.Content>
            <Title>{post.post_title}</Title>
          </Card.Content>
          {post.post_img.length > 0 && (
            <Card.Cover
              source={Images[post.post_img]}
              style={{ width: "100%", height: 200, objectFit: "cover" }}
            />
          )}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 15,
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => handleUserLiked(userId, post.post_id)} // Adjust userId and postId accordingly
            >
              <AntDesign name="like1" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 16 }}>{countLike}</Text>
            <TouchableOpacity style={{ paddingHorizontal: 10 }}>
              <Ionicons name="chatbubble-ellipses" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 16 }}>{countComment}</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              overflow: "scroll",
              width: "100%",
            }}
          >
            <FlatList
              data={allComment}
              renderItem={({ item, index }) => {
                if (item.post_id === post.post_id) {
                  if (item.user_id !== userId) {
                    return (
                      <View
                        style={{
                          borderRadius: 10,
                          marginVertical: 10,
                          width: "100%",
                          paddingVertical: 10,
                          paddingLeft: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: "#eaeaea",
                        }}
                      >
                        <Text style={{ fontSize: 19 }}>{item.name}</Text>
                        <Text style={{ fontSize: 17 }}>
                          {item.comment_content}
                        </Text>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        style={{
                          borderRadius: 10,
                          marginVertical: 10,
                          width: "100%",
                          paddingVertical: 10,
                          paddingLeft: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: "#eaeaea",
                        }}
                      >
                        <Text style={{ fontSize: 19 }}>{item.name}</Text>
                        <Text style={{ fontSize: 17 }}>
                          {item.comment_content}
                        </Text>
                        <TouchableOpacity
                          style={{
                            position: "absolute",
                            right: 10,
                            top: 20,
                          }}
                          onPress={() => deleteComment(item.comment_id)}
                        >
                          <MaterialCommunityIcons
                            name="delete"
                            size={24}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }
                }
              }}
              keyExtractor={(item, index) => item.comment_id + "_" + index}
              style={{
                width: "100%",
                height: 500,
                paddingBottom: 30,
              }}
            />
          </View>
        </Card>
      ))}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          marginBottom: 35,
          paddingBottom: 10,
          paddingHorizontal: 40,
          paddingTop: 10,
          backgroundColor: "#fff",
        }}
      >
        <TextInput
          style={{
            fontSize: 20,
            width: "90%",
            height: 50,
            borderBottomColor: "#333",
            borderBottomWidth: 1,
          }}
          onChangeText={(value) => setComment(value)}
          value={comment}
        />
        {allPost.map((post) => (
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 50,
              borderWidth: 1,
              backgroundColor: "#333",
              marginLeft: 15,
            }}
            onPress={() => handleComment(userId, post.post_id, comment)} // Adjust userId and postId accordingly
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FullPostScreen;
