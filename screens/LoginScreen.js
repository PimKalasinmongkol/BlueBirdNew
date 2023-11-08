import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { SignIn } from '../hooks/useAuth'

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(email, password)
    const account = {
      email: email,
      password: password
    }
    SignIn(account, success, unsuccess)
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
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ backgroundColor: "#F1C40F", padding: 5, borderTopRightRadius: 16, borderBottomLeftRadius: 16, marginLeft: 16 }}
            onPress={() => navigation.goBack()} >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
          <Image source={require('../assets/images/welcome.png')}
            style={{ width: 200, height: 200 }} />
        </View>


      </SafeAreaView>
      <View
        style={{ flex: 2, backgroundColor: "#00007e", borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingLeft: 28, paddingRight: 28, paddingTop: 28 }} >
        <View style={{ paddingTop: 10 }}>
          <Text style={{ color: "#fff", marginLeft: 12, fontWeight: "bold", paddingBottom: 5 }}>Email Address</Text>
          <TextInput style={{ padding: 10, backgroundColor: "#fff", color: "#323232", borderRadius: 32, marginBottom: 10 }}
            placeholder="email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <Text style={{ color: "#fff", marginLeft: 12, fontWeight: "bold", paddingBottom: 5 }}>Password</Text>
          <TextInput style={{ padding: 10, backgroundColor: "#fff", color: "#323232", borderRadius: 32, marginBottom: 15 }}
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Forgot')} >
            <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "right", marginBottom: 24, color: "#fff" }}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: "#F1C40F", marginLeft: 30, marginRight: 30, borderRadius: 12 }}
            onPress={handleLogin}>
            <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", paddingTop: 10, paddingBottom: 10, color: "#fff" }}>Or</Text>
        <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", color: "#fff" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity style={{ fontWeight: "bold" }} onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ fontWeight: "bold", color: "#F1C40F" }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  )
}