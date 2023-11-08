import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { themeColors } from '../theme'
import { SignOut } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { Card, Title } from 'react-native-paper';
import Images from '../createImageImport'


export default function ProfileScreen() {
    const [name ,setName] = useState(null);
    const [userId,setUserId] = useState(null);
    const [userImg ,setUserImg] = useState('');
    const [items ,setItems] = useState([]);
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

    const fetchUserData = async () => {
        const response = await fetch(
          `http://192.168.94.10:4000/getEditWithUserId`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setName(data[0].name);
        setUserImg(data[0].photoURL);
        setUserId(data[0].id);
    }

    const fetchUserPost = async () => {
        const response = await fetch(
          `http://192.168.94.10:4000/getPostsByUser`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setItems(data);
    }

    useEffect(() => {
        fetchUserData()
        fetchUserPost()
    }, [])

    const renderPost = ({ item }) => (
        <TouchableOpacity
            onPress={() =>
            navigation.navigate("FullPost", {
                postId: item.post_id,
                userId: userId
            })
            }
        >
            <Card style={{ width: '100%',marginRight: 10 }}> 
                <Card.Cover
                    source={Images[item.post_img]}
                    style={{ aspectRatio: 1 ,justifyContent: 'center' ,alignSelf: 'center' }}
                    resizeMode="cover"
                />
                <Text style={{textAlign:'center',marginVertical: 10,fontSize: 15 ,fontWeight: 600}}>{item.post_title}</Text>
            </Card>
        </TouchableOpacity>
    );
    
    

    return (
        <SafeAreaView style={{ flex: 12, backgroundColor: themeColors.bg }}>
            <View style={styles.navBar}>
                <Text style={{ fontWeight: "bold", fontSize: 30, color: "#F1C40F" }}>BlueBird</Text>
                <TouchableOpacity style={{}}
                    onPress={handleLogout}>
                    <FontAwesome name="sign-out" size={30} color="#F1C40F" />
                </TouchableOpacity>
            </View>


            <View style={{ flex: 10 }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image source={{uri : userImg}}
                        style={{ width: 150, height: 150, borderRadius: 100 }} />
                    <Text style={{ fontWeight: "bold", padding: 20, fontSize: 20 }}>{name}</Text>
                    <TouchableOpacity style={{flexDirection:'row',backgroundColor:"#F1C40F",padding:5,borderRadius:10,}}
                        onPress={() => navigation.navigate('Edit')}>
                        <Text style={{fontSize:15}}>Edit </Text>
                        <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>


                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                <FlatList 
                    data={items}
                    renderItem={renderPost}
                    keyExtractor={(item) => item.post_id}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'flex-start' }}
                />
                </View>
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

});
