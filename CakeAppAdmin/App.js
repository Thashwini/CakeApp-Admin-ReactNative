import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AddCategories from './screens/AddCategories';
import firebase from 'firebase';
import {config} from './firebaseconfig'
import AuthForm from './auth/AuthForm';
import CakeFormScreen from './screens/CakeFormScreen';
import CakeDetailsScreen from './screens/CakeDetailsScreen';

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    
    
  }, [])

  if(!firebase.apps.length){
    firebase.initializeApp(config)
  }
  else{
    firebase.app()
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name='AuthForm'
        component={AuthForm}
        options={{
          headerShown:false,
          ...TransitionPresets.RevealFromBottomAndroid

      }}
        />
        <Stack.Screen
        name='AddCategories'
        component={AddCategories}
        options={{
          headerShown:false,
          ...TransitionPresets.RevealFromBottomAndroid

      }}
        />
        <Stack.Screen
        name='CakeFormScreen'
        component={CakeFormScreen}
        options={{
          headerShown:false,
          ...TransitionPresets.RevealFromBottomAndroid

      }}
        />
        <Stack.Screen
        name='CakeDetailsScreen'
        component={CakeDetailsScreen}
        options={{
          headerShown:false,
          ...TransitionPresets.RevealFromBottomAndroid

      }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
