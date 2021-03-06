import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useFonts } from 'expo-font'
import Rakkas from '../../assets/fonts/fonts.js'

const SplashScreen = (props) => {
 
   let [loaded] = useFonts({
       Rakkas: Rakkas
   })

   if(!loaded){
       return null;
   }
  return (
    <View style={{
        alignItems:"center", 
        justifyContent:"center",
        width:"100%",
        height:"100%",
        opacity: props.opacityValue,
        backgroundColor:"#FFCC56",
        zIndex:10
        }}>
    <Text style={{fontSize:25, fontFamily: 'Rakkas', bottom:20}}>Loading...</Text>
    <ActivityIndicator size="large" color= "#064635"/>
</View>
  )
}

export default SplashScreen