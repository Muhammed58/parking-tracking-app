import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home.js'
import MainPage from './screens/MainPage.js'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={ {headerShown: false, gestureEnabled: false} }
        initialRouteName={"Home"}>

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MainPage" component={MainPage}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
