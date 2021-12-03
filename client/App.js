
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './routes/HomeStack.js';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator headerMode="none"/>
    </NavigationContainer>
  );
  
}
