import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { SignUp } from '../hooks/useAuth'

// subscribe for more videos like this :)
export default function SignUpScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        const account = {
            name: name,
            email: email,
            password: password
        }
        SignUp(account,success,unsuccess)
    };

    const success = (msg) => {
        Alert.alert(` ${msg} `)
        navigation.push('Home')
      }

    const unsuccess = (msg) => {
        console.log(msg)
        Alert.alert(msg)
    }

    return (
        <View style={{ backgroundColor: themeColors.bg, flex: 3 }}>
            <SafeAreaView style={{ flex: 0.8 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ backgroundColor: "#F1C40F", padding: 5, borderTopRightRadius: 16, borderBottomLeftRadius: 16, marginLeft: 16 }}
                        onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Image source={require('../assets/images/welcome.png')}
                        style={{ width: 180, height: 180 ,}} />
                </View>
            </SafeAreaView>
            <View style={{ flex: 2.2, backgroundColor: "#00007e", borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingLeft: 25, paddingRight: 25, paddingTop: 28 }}>
                <View style={{ paddingTop: 10 }}>
                    <Text style={{ color: "#fff", marginLeft: 12, fontWeight: "bold", paddingBottom: 5 }}>Full Name</Text>
                    <TextInput style={{ padding: 10, backgroundColor: "#fff", color: "#323232", borderRadius: 32, marginBottom: 20 }}
                        value={name}
                        onChangeText={(value) => setName(value)}
                        placeholder='Enter Name'
                    />
                    <Text style={{ color: "#fff", marginLeft: 12, fontWeight: "bold", paddingBottom: 5 }}>Email Address</Text>
                    <TextInput style={{ padding: 10, backgroundColor: "#fff", color: "#323232", borderRadius: 32, marginBottom: 20 }}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        placeholder='Enter Email'
                    />
                    <Text style={{ color: "#fff", marginLeft: 12, fontWeight: "bold", paddingBottom: 5 }}>Password</Text>
                    <TextInput style={{ padding: 10, backgroundColor: "#fff", color: "#323232", borderRadius: 32, marginBottom: 20 }}
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        placeholder='Enter Password'
                    />
                    <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: "#F1C40F", marginLeft: 30, marginRight: 30, borderRadius: 12 }}
                        onPress={handleSignUp}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", paddingTop: 10, paddingBottom: 10, color: "#fff" }}>
                    Or
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: "center", borderRadius: 16 }} >
                    <TouchableOpacity style={{ padding: 3, borderRadius: 50, margin: 5, backgroundColor: "#fff" }}>
                        <Image source={require('../assets/icons/google.png')}
                            style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 3, borderRadius: 50, margin: 5, backgroundColor: "#fff" }}>
                        <Image source={require('../assets/icons/apple.png')}
                            style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 3, borderRadius: 50, margin: 5, backgroundColor: "#fff" }}>
                        <Image source={require('../assets/icons/facebook.png')}
                            style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontWeight: "bold", color: "#F1C40F" }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}