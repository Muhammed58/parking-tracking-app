import React, { useState, useEffect }  from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font'
import { View, Text } from 'react-native';




export default function MainPage({navigation}) {

    return(
        <View style={{
            width:"100%",
            height:"100%",
            alignItems:"center",
            justifyContent:"center",
        }}>
            <Text>Main Page</Text>

        </View>
    )


}