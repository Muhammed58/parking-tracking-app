import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font'
import MainPageBackImage from './subScreens/MainPageBackImage.js';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as SecureStore from 'expo-secure-store';
import { LOGIN_KEY, GET_LASTLOCATION, GET_LOCATIONLIST } from '@env'
import { View, Text, Image,
        StyleSheet, Dimensions, TouchableOpacity,
        Pressable, ActivityIndicator    } from 'react-native';
import axios from 'axios';


// define images
const parkingHistory = require('../assets/images/parkingHistory.png');
const currentParking = require('../assets/images/currentParking.png')
const parkHere = require('../assets/images/parkHereIcon.png')


export default function MainPage ({navigation}) {
     //Fonts define
    const[loaded] = useFonts({
        Rakkas: require('../assets/fonts/Rakkas-Regular.ttf')
    })

    // Set last location data
    const [lastLocation, setLastLocation] = useState([
        40.6017004,-73.947738
    ])

    useEffect(async() => {
        let token = await SecureStore.getItemAsync(LOGIN_KEY);
        await axios.get(GET_LASTLOCATION, { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                setLastLocation(res.data.location)
            })
            .catch(err=> console.log(err))

        }, [])
    

         // Set last location data
    const [locationList, setLocationList] = useState({})
    useEffect(async() => {
        let token = await SecureStore.getItemAsync(LOGIN_KEY);
        await axios.get(GET_LOCATIONLIST, { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                setLocationList(res.data)
            })
            .catch(err=> console.log(err))

        }, [])
    
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 500); 
    }, [])
    

    const handleSignOut = () => {
        SecureStore.deleteItemAsync(LOGIN_KEY)
                    .then(navigation.navigate('Home'))
    }

    const handleCurrentParking = () =>{
        navigation.navigate('CurrentParking',{
            latitude: lastLocation[0],
            longitude: lastLocation[1]
        })
    }
    const handleParkingHistory = () =>{
        navigation.navigate('ParkingHistory',{
            latitude: lastLocation[0],
            longitude: lastLocation[1],
            locationList: locationList
        })
    }
    
    if (!loaded) {
        return null;
    }
    return(
        <>
        {!isLoaded ? ( <View style={{
            alignItems:"center", 
            justifyContent:"center",
            width:"100%",
            height:"100%",
            backgroundColor:"#FFCC56"
            }}>
        <Text style={{fontSize:25, fontFamily:"Rakkas", bottom:20}}>Loading...</Text>
        <ActivityIndicator size="large" color= "#064635"/>
    </View>)

    : (
        <View style={styles.mainContainer}>
            <MainPageBackImage/>
            <TouchableOpacity activeOpacity={0.6} style={styles.userIcon} onPress={handleSignOut} >
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
                styles.parkingHistoryContainer]}
                onPress={handleParkingHistory}>
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
                    },styles.currentParkingContainer]}
                    onPress={handleCurrentParking}>

                <Image source={currentParking} style={styles.currentParkingImage}/>
                <View style={styles.currentTextContainer}>
                    <Text style={styles.currentParkingText}>Current Parking</Text>
                </View>
                
            </Pressable>
            <Pressable activeOpacity={0.6} onPress={()=>{
                navigation.navigate('ParkHere')
            }} style={
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
     )}
     </>
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
        height: height * 0.20,
        top: height * -0.03,
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
        top: height * -0.06,
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