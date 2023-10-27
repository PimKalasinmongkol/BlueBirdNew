import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: themeColors.bg,flex:1}}>
        <View style={{justifyContent:'space-around',flex:1}}>
            <Text style={{color:"#fff",fontWeight:"bold",textAlign:'center',fontSize: 20}}>
                Let's Get Started!
            </Text>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Image source={require("../assets/images/welcome.png")}
                    style={{width: 350, height: 350}} />
            </View>
            <View style={{marginTop:26}}>
                <TouchableOpacity style={{paddingTop:20,paddingBottom:20,backgroundColor:"#F1C40F",marginLeft:28,marginRight:28,borderRadius:12}}
                    onPress={()=> navigation.navigate('SignUp')}>
                        <Text style={{fontSize: 16,fontWeight:"bold",textAlign:"center"}}>
                            Sign Up
                        </Text>
                </TouchableOpacity>
                <View style={{flexDirection:"row", justifyContent:"center",paddingTop:10}}>
                    <Text style={{color:"#fff",fontWeight:"bold"}}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text style={{fontWeight:"bold",color:"#F1C40F"}} > Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}