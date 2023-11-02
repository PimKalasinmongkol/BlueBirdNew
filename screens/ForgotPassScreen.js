import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { ForgotPass } from '../hooks/useAuth'

export default function ForgotPassScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        ForgotPass(email, success, unsuccess)
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
        <SafeAreaView style={{ backgroundColor: themeColors.bg, flex: 5 }}>
            <View style={{ justifyContent: 'space-around', flex: 2, }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ backgroundColor: "#F1C40F", padding: 5, borderTopRightRadius: 16, borderBottomLeftRadius: 16, marginLeft: 16 }}
                        onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "#373737", fontWeight: "bold", textAlign: 'center', fontSize: 20,marginTop:30 }}>
                    Welcome to Recover password by email
                </Text>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={require("../assets/images/welcome.png")}
                        style={{ width: 250, height: 250 }} />
                </View>

            </View>
            <View style={{ flex: 3, marginLeft: "20%", marginRight: "20%",paddingTop:20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Email</Text>
                <TextInput style={styles.textinp}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    placeholder='Enter Email'
                />
                <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity style={{ backgroundColor: "#F1C40F", padding: 12, borderRadius: 20 }}
                        onPress={handleSubmit}>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textinp: {
        padding: 10,
        backgroundColor: "#fff",
        color: "#323232",
        borderRadius: 32,
        marginBottom: 20,
        borderWidth: 1,
        width: "100%",
        marginTop: 10,
        fontSize: 16,

    }
})