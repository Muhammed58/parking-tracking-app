import React from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font'
import MainPageBackImage from './subScreens/MainPageBackImage.js';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { View, Text, Image,
        StyleSheet, Dimensions, TouchableOpacity,
        Pressable,       } from 'react-native';


// define images
const parkingHistory = require('../assets/images/parkingHistory.png');
const currentParking = require('../assets/images/currentParking.png')
const parkHere = require('../assets/images/parkHereIcon.png')

export default function MainPage ({navigation}) {
     //Fonts define
     const[loaded] = useFonts({
        Rakkas: require('../assets/fonts/Rakkas-Regular.ttf')
    })




    if (!loaded) {
        return null;
    }
    return(
        <View style={styles.mainContainer}>
            <MainPageBackImage/>
            <TouchableOpacity activeOpacity={0.6} style={styles.userIcon}>
                <FontAwesomeIcon icon={ faUserCircle } size={ 37 } style={styles.userProfile}/>
            </TouchableOpacity>
            <Pressable activeOpacity={0.6}   style={
                ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed? 0.1: 0.9,
                    shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10}:{ translateY:0}]
                    },
                styles.parkingHistoryContainer]}>
                <Image source={parkingHistory} style={styles.parkingHistoryImage}/>
                <View style={styles.historyTextContainer}>
                    <Text style={styles.parkingHistoryText}>Parking History</Text>
                </View>
            </Pressable>
            <Pressable activeOpacity={0.6}  style={
                ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed? 0.1: 0.9,
                    shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10}:{ translateY:0}]
                    },styles.currentParkingContainer]}>
                <Image source={currentParking} style={styles.currentParkingImage}/>
                <View style={styles.currentTextContainer}>
                    <Text style={styles.currentParkingText}>Current Parking</Text>
                </View>
                
            </Pressable>
            <Pressable activeOpacity={0.6} style={
                 ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed? 0.1: 0.9,
                    shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10}:{ translateY:0}]
                    },
                    styles.parkHereContainer]}>
                <Image source={parkHere} style={styles.parkHereImage}/>
                <View style={styles.parkHereTextContainer}>
                    <Text style={styles.parkHereText}>Park Here!</Text>
                </View>
            </Pressable>
        </View>
    )
}

//Get screen height and width for responsive
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    mainContainer:{
        position:"relative",
        width:"100%",
        height:"100%",
        paddingTop: height * 0.26,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#FFCC56",
    },
    userIcon:{
        position:"relative",
        width: width * 0.13,
        height: height * 0.06,
        alignItems:"center",
        justifyContent:"center",
        top: height * -0.64,
        left: width * 0.4,  
    },
    userProfile:{
        position:"absolute",
    },
    parkingHistoryContainer:{
        position:"relative",
        width: width * 0.5,
        height: height * 0.15,
        borderTopEndRadius:500,
        alignItems:"center",
        justifyContent:"center",
        top: height * -0.69,
        left: width * 0.1,
    },
    parkingHistoryImage:{
        position:"absolute",
        width: width * 0.32,
        height: height * 0.10,
        top: height * 0.01,
        resizeMode: "stretch",
    },
    historyTextContainer:{
        position:"absolute",
        top: height * 0.12,
        borderWidth:3,
        borderRadius:10,
        backgroundColor:"#FFCC56",
        padding:3,
    },
    parkingHistoryText:{
        fontFamily:"Rakkas",
        fontSize: width * 0.06,
    },
    currentParkingContainer:{
        position:"relative",
        width: width * 0.6,
        height: height * 0.2,
        alignItems:"center",
        justifyContent:"center",
        top: height * -0.60,
        left: width * -0.25,
    },
    currentParkingImage:{
        position:"absolute",
        width: width * 0.55,
        height: height * 0.30,
        top: height * -0.09,
        resizeMode: "stretch",
    },
    currentTextContainer:{
        position:"absolute",
        top: height * 0.17,
        borderWidth:3,
        borderRadius:10,
        backgroundColor:"#FFCC56",
        padding:3,
        
    },
    currentParkingText:{
        fontSize: width * 0.06,
        fontFamily:"Rakkas",
    },
    parkHereContainer:{
        position:"relative",
        width: width * 0.6,
        height: height * 0.2,
        alignItems:"center",
        justifyContent:"center",
        top: height * -0.50,
        left: width * 0.03,
    },
    parkHereImage:{
        position:"absolute",
        width: width * 0.7,
        height: height * 0.23,
        top: height * -0.05,
        resizeMode: "stretch",
    },

    parkHereTextContainer:{
        position:"absolute",
        top: height * 0.15,
        borderWidth:3,
        borderRadius:10,
        backgroundColor:"#FFCC56",
        padding:3,
    },
    parkHereText:{
        fontFamily:"Rakkas",
        fontSize: width * 0.06,
        
    },
})