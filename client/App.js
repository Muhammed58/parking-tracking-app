import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home.js'
import {Text, View, ActivityIndicator} from 'react-native'
import { useFonts } from 'expo-font'
import MainPage from './screens/MainPage.js'
import ParkHere from './screens/ParkHere.js'
import CurrentParking from './screens/CurrentParking.js'
import auth from './screens/subScreens/auth'
import ParkingHistory from './screens/ParkingHistory.js';

const Stack = createNativeStackNavigator();

export default function App() {

  //Fonts define
  const[loaded] = useFonts({
    Rakkas: require('./assets/fonts/Rakkas-Regular.ttf')
  })

  const authorization = auth()
  console.log(authorization)

 
  if (!loaded) {
    return null;
  }
  return (
   <NavigationContainer>
      <Stack.Navigator
        screenOptions={ {headerShown: false, gestureEnabled: false} }
        /* initialRouteName={ authorization ? "MainPage" : "Home"}> */
        initialRouteName={"MainPage"}>

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MainPage" component={MainPage}  />
        <Stack.Screen name="ParkHere" component={ParkHere} />
        <Stack.Screen name="CurrentParking" component={CurrentParking} />
        <Stack.Screen name="ParkingHistory" component={ParkingHistory} />


      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
