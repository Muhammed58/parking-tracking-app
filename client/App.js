import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home.js'
import MainPage from './screens/MainPage.js'
import ParkHere from './screens/ParkHere.js'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={ {headerShown: false, gestureEnabled: false} }
        initialRouteName={"ParkHere"}>

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MainPage" component={MainPage}  />
        <Stack.Screen name="ParkHere" component={ParkHere} />

      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
