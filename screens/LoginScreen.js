import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: themeColors.bg, flex: 3 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ backgroundColor: "#F1C40F", padding: 5, borderTopRightRadius: 16, borderBottomLeftRadius: 16, marginLeft: 16 }}
            onPress={() => navigation.goBack()} >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' , alignItems:"center" }}>
          <Image source={require('../assets/images/login.png')}
            style={{ width: 200, height: 200 }} />
        </View>


      </SafeAreaView>
      <View
        style={{ flex: 2, backgroundColor: "#fff", borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingLeft: 28, paddingRight: 28, paddingTop: 28 }} >
        <View>
          <Text style={{ color: "#778899", marginLeft: 16, fontWeight: "bold" }}>Email Address</Text>
          <TextInput style={{ padding: 10, backgroundColor: "#D3D5D6", color: "#323232", borderRadius: 32, marginBottom: 24 }}
            placeholder="email"
            value="john@gmail.com"
          />
          <Text style={{ color: "#778899", marginLeft: 16, fontWeight: "bold" }}>Password</Text>
          <TextInput style={{ padding: 10, backgroundColor: "#D3D5D6", color: "#323232", borderRadius: 32, marginBottom: 24 }}
            secureTextEntry
            placeholder="password"
            value="test12345"
          />
          <TouchableOpacity >
            <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "right", marginBottom: 24 }}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: "#F1C40F", marginLeft: 30, marginRight: 30, borderRadius: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>Or</Text>
        <View style={{ flexDirection: 'row', justifyContent: "center", borderRadius: 16 }}>
          <TouchableOpacity style={{ padding: 6, borderRadius: 20 }} >
            <Image source={require('../assets/icons/google.png')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 6, borderRadius: 20 }} >
            <Image source={require('../assets/icons/apple.png')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 6, borderRadius: 20 }} >
            <Image source={require('../assets/icons/facebook.png')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>
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