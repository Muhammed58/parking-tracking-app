import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font'
import Settings from './subScreens/Settings.js'
import MainPageBackImage from './subScreens/MainPageBackImage.js';
import { ErrorPage } from './subScreens/ErrorPage.js';
import { View, Text, Image, StyleSheet, Dimensions,
        Pressable, ActivityIndicator } from 'react-native';

import { AuthContext } from './subScreens/forgotPassword.js';
import {getLastLocation, getLocationList, getProfile} from '../api.js'
import * as SecureStore from 'expo-secure-store';
import { LOGIN_KEY } from '@env'
import SplashScreen from './subScreens/SplashScreen.js';

// define images
const parkingHistory = require('../assets/images/parkingHistory.png');
const currentParking = require('../assets/images/currentParking.png')
const parkHere = require('../assets/images/parkHereIcon.png')


export default function MainPage ({route, navigation}) {

    // SET LAST LOCATION DATA
    const [lastLocation, setLastLocation] = useState( [] )
    useEffect(() => {
            getLastLocation()            
            .then((res) => {setLastLocation(res.data.location);})
            .catch(err=> {console.log(err); setLastLocation(err)})
        }, [route.params])

    // GET LIST OF LOCATIONS 
    const [locationList, setLocationList] = useState({})
    useEffect(() => {
         getLocationList()            
        .then((res) => { setLocationList(res.data) })
        .catch(err=> console.log(err))
        }, [route.params])

    //GET PROFILE INFORMATION
    const [profileInfo, setProfileInfo] = useState({})
    useEffect(() => {
        getUserProfile= async () => {
            userToken = await SecureStore.getItemAsync(LOGIN_KEY); 
            if(userToken !== null){
              await getProfile(userToken)
              .then(res=> {
                setProfileInfo(res.data)
              })
              .catch(err=> console.log("getUserProfileErr", err))
            }
        },
        getUserProfile()
    }, [route.params])
    
    //Loading page
    const [isLoaded, setIsLoaded] = useState(false)

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

    //HANDLE ERROR MESSAGES
    const [errorMessage, setErrorMessage] = useState(false)
     
    //FONTS DEFINE
    const[loaded] = useFonts({
        Rakkas: require('../assets/fonts/Rakkas-Regular.ttf')
    })
    
    if (!loaded) {
        return null;
    } 
    
    return(
        <>
        {isLoaded ? ( <SplashScreen/>
        
        ) : (
        
        <View style={styles.mainContainer}>
            <MainPageBackImage/>
         
            <Pressable activeOpacity={0.6}   style={
                ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed ? 0.1 : 0.9,
                    shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10}:{ translateY:0}],
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
            <Settings profile={profileInfo} locationList={locationList}/>

            { errorMessage && <ErrorPage errorMessage={"error Message"}/>}
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
        paddingTop: height * 0.23,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#FFCC56",
    },

    parkingHistoryContainer:{
        position:"relative",
        width: width * 0.5,
        height: height * 0.15,
        borderTopEndRadius:500,
        alignItems:"center",
        borderWidth:0,
        justifyContent:"center",
        top: height * -0.66,
        left: width * 0.17,
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
        top: height * -0.58,
        left: width * -0.22,
    },

    currentParkingImage:{
        position:"absolute",
        width: width * 0.55,
        height: height * 0.20,
        top: height * -0.03,
    },

    currentTextContainer:{
        position:"absolute",
        top: height * 0.18,
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
        top: height * -0.47,
        left: width * 0.05,
    },

    parkHereImage:{
        position:"absolute",
        width: width * 0.7,
        height: height * 0.23,
        top: height * -0.06,
    },

    parkHereTextContainer:{
        position:"absolute",
        top: height * 0.16,
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