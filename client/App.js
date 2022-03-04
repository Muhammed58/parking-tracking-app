import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home.js'
import { useFonts } from 'expo-font'
import MainPage from './screens/MainPage.js'
import ParkHere from './screens/ParkHere.js'
import CurrentParking from './screens/CurrentParking.js'
import ParkingHistory from './screens/ParkingHistory.js';
import ProfilePage from './screens/ProfilePage.js';
import auth from './screens/subScreens/auth.js'

const Stack = createNativeStackNavigator();

export default function App() {

  //Fonts define
  const[loaded] = useFonts({
    Rakkas: require('./assets/fonts/Rakkas-Regular.ttf')
  })

 let authorization = auth();
  
  console.log("this",authorization)

  if (!loaded) {
    return null;
  }
  return (
   <NavigationContainer>
      <Stack.Navigator
        screenOptions={ {headerShown: false, gestureEnabled: false} }
        initialRouteName={ authorization ? "MainPage" : "Home" }>

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="ParkHere" component={ParkHere} />
        <Stack.Screen name="CurrentParking" component={CurrentParking} />
        <Stack.Screen name="ParkingHistory" component={ParkingHistory} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
