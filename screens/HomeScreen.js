import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SignOut } from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


const sampleData = [
  {
    id: '1',
    username: 'user1',
    image: 'https://via.placeholder.com/150',
    caption: 'This is a sample caption',
    likes: 10,
  },
  {
    id: '2',
    username: 'user2',
    image: 'https://via.placeholder.com/150',
    caption: 'Another sample caption',
    likes: 20,
  },
  {
    id: '3',
    username: 'user3',
    image: 'https://via.placeholder.com/150',
    caption: 'Another sample caption',
    likes: 20,
  },
  // Add more sample posts as needed
];

export default function HomeScreen() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2:4000/api/attractions')
      .then(res => res.json())
      .then((result) => {
        console.log(result)
        
      },
      (error) => {
        console.log(error)
      }
      )
  }, [])

  /*items.forEach((massage) => {
    console.log(items)
  })*/

  const navigation = useNavigation();
  const handleLogout = () => {
    SignOut(success, unsuccess);
  };

  const success = (msg) => {
    Alert.alert(` ${msg} `)
    navigation.push('Welcome')
  }

  const unsuccess = (msg) => {
    console.log(msg)
    Alert.alert(msg)
  }

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <Text style={styles.caption}>{item.caption}</Text>
      <Text style={styles.likes}>{`${item.likes} likes`}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 12 }}>
      <View style={styles.navBar}>
        <Text style={{ fontWeight: "bold", fontSize: 30, color: "#F1C40F" }}>BlueBird</Text>
        <TouchableOpacity style={{}}
          onPress={handleLogout}>
          <FontAwesome name="sign-out" size={30} color="#F1C40F" />
        </TouchableOpacity>
      </View>


      <View style={{ flex: 10 }}>
        <FlatList
          data={sampleData}
          renderItem={renderPost}
          keyExtractor={item => item.id}
        />
      </View>


      <View style={styles.navBar}>
        <TouchableOpacity style={styles.button_nav}
          onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" size={26} color="#F1C40F" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_nav}
          onPress={() => navigation.navigate('Search')}>
          <FontAwesome name="search" size={26} color="#F1C40F" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_nav}
          onPress={() => navigation.navigate('Post')}>
          <FontAwesome name="file-photo-o" size={26} color="#F1C40F" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_nav}
          onPress={() => navigation.navigate('Profile')}>
          <FontAwesome name="user-circle-o" size={26} color="#F1C40F" />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
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
    backgroundColor: "#00007e"
  },
  button_nav: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  postContainer: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  caption: {
    marginTop: 5,
  },
  likes: {
    color: 'blue',
  },

});
