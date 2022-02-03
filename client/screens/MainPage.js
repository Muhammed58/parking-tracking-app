import React from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font'
import MainPageBackImage from './subScreens/MainPageBackImage.js';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { View, Text, Image,
        StyleSheet, Dimensions, TouchableOpacity
                                } from 'react-native';


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
            <TouchableOpacity activeOpacity={0.6}   style={styles.parkingHistoryContainer}>
                <Image source={parkingHistory} style={styles.parkingHistoryImage}/>
                <Text style={styles.parkingHistoryText}>Parking History</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}  style={styles.currentParkingContainer}>
                <Image source={currentParking} style={styles.currentParkingImage}/>
                <Text style={styles.currentParkingText}>Current Parking</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.parkHereContainer}>
                <Image source={parkHere} style={styles.parkHereImage}/>
                <Text style={styles.parkHereText}>Park Here!</Text>
            </TouchableOpacity>
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
    parkingHistoryText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize: width * 0.06,
        top: height * 0.11,
        borderWidth:3,
        borderRadius:10,
    },
    currentParkingContainer:{
        position:"relative",
        width: width * 0.6,
        height: height * 0.2,
        alignItems:"center",
        justifyContent:"center",
        top: height * -0.61,
        left: width * -0.25,
    },
    currentParkingImage:{
        position:"absolute",
        width: width * 0.45,
        height: height * 0.30,
        top: height * -0.09,
        resizeMode: "stretch",
    },
    currentParkingText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize: width * 0.06,
        top: height * 0.16,

        borderWidth:3,
        borderRadius:10,
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
        height: height * 0.27,
        top: height * -0.08,
        resizeMode: "stretch",
    },
    parkHereText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize: width * 0.06,
        top: height * 0.15,
        borderWidth:3,
        borderRadius:10,
    },
})