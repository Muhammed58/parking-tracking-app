import React from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native'


import {View, Text, StyleSheet, Dimensions,
        TouchableOpacity, Image
                                            } from 'react-native'


//fetch images
const image = require('../../assets/images/road.png')
  
export default function MainPageBackImage() {

  
  const navigation = useNavigation()

  return (
  <View style={styles.mainContainer}>
        <Image source={image} style={styles.backgroundImage}/>
        <Image source={image} style={styles.backgroundImage2}/>
  </View>

)}

//Get screen height and width for responsive
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const styles = StyleSheet.create({
    mainContainer:{
        width:"100%",
        height:"100%",
        elevation:-3,
    },
    backgroundImage:{
        width: width * 1.6,
        height: height * 0.8,
        top: height * 0.34,
        left: width * -0.07,
        resizeMode: "stretch",
        zIndex: 10,
    },

    backgroundImage2:{
      width: width * 2.3,
      height: height * 1.1,
      top: height * -0.77,
      left: width * -0.73,
      zIndex:30,
      resizeMode:"stretch",
      transform: [{rotateY: '180deg'}]
    },
})