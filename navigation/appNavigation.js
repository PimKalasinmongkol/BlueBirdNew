import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileScreen from '../screens/ProfileScreen'
import PostScreen from '../screens/PostScreen';
import SearchScreen from '../screens/SearchScreen'
import EditScreen from '../screens/EditScreen'
import ForgotPassScreen from '../screens/ForgotPassScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {


  return (
    <Stack.Navigator initialRouteName='Welcome' screenOptions={
      { headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Forgot" component={ForgotPassScreen} />
    </Stack.Navigator>
  )




}