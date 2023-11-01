import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { themeColors } from '../theme'
import { SignOut } from '../hooks/useAuth'


export default function EditScreen() {
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
    return (
        <SafeAreaView style={{ flex: 12, backgroundColor: themeColors.bg }}>
            <View style={styles.navBar}>
                <Text style={{ fontWeight: "bold", fontSize: 30, color: "#F1C40F" }}>BlueBird</Text>
                <TouchableOpacity style={{}}
                    onPress={handleLogout}>
                    <FontAwesome name="sign-out" size={30} color="#F1C40F" />
                </TouchableOpacity>
            </View>


            <View style={{ flex: 10, marginLeft:"10%", marginRight: "10%" ,justifyContent:"center"  }}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Image source={require('../assets/pim.jpg')}
                            style={{ width: 150, height: 150, borderRadius: 100 }} />
                        <TouchableOpacity style={{ backgroundColor: "#00A6FF", padding: 10, margin: 10, borderRadius: 10, width: 100, alignItems: "center", marginLeft:80 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Upload</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text>Name</Text>
                        <TextInput style={styles.textinp} value='Pim Kalasinmongkol' />
                    </View>
                    <View >
                        <Text>Email</Text>
                        <TextInput style={styles.textinp} value='pure@ku.th' />
                    </View>
                    <View >
                        <Text>Password</Text>
                        <TextInput style={styles.textinp} value='123456' />
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                    <TouchableOpacity style={{ backgroundColor: "#F1C40F", padding: 10, margin: 10, borderRadius: 10, width: 100, alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#E34D4D", padding: 10, margin: 10, borderRadius: 10, width: 100, alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Cancel</Text>
                    </TouchableOpacity>
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
    textinp: {
        backgroundColor: "#C7C7C7",
        width: 200,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 15
    }

});
