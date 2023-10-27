import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (    
      <Stack.Navigator initialRouteName='Welcome' screenOptions={
        { headerShown: false }}>
        <Stack.Screen name="Home"  component={HomeScreen} />
        <Stack.Screen name="Welcome"  component={WelcomeScreen} />
        <Stack.Screen name="Login"  component={LoginScreen} />
        <Stack.Screen name="SignUp"  component={SignUpScreen} />
      </Stack.Navigator>
  )
}