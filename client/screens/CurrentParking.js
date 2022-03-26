import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import openMap from 'react-native-open-maps'
import GoBackButton from './subScreens/GoBackButton.js'
import { ErrorPage } from './subScreens/ErrorPage.js';
import { getLastLocation } from '../api.js'

import {View, Text, StyleSheet, 
    Dimensions, Pressable,
} from 'react-native'



export default function ParkHere({route,navigation}){

    //Fonts define
    const[loaded] = useFonts({
        Rakkas: require('../assets/fonts/Rakkas-Regular.ttf')
    })

    
    /* Start Apple Navigation onPress Handler */
    const openAppleMapHandler = () =>{
        openMap( {query:`${route.params.latitude}, ${route.params.longitude}`, provider:"apple" }, {latitude: route.params.latitude, longitude: route.params.longitude})
    }

    /* Start Google Navigation onPress Handler */
    const openGoogleMapHandler = () =>{
        openMap( {query:`${route.params.latitude}, ${route.params.longitude}`, provider:"google" }, {latitude: route.params.latitude, longitude: route.params.longitude})
    }

    const [chooseMap, setChooseMap] = useState(false)

    //HANDLE ERROR MESSAGES
    const [errorMessage, setErrorMessage] = useState(false)
    const [errorMessageText, setErrorMessageText] = useState('Error message')

    //LAST LOCATION DATA
    const [lastLocation, setLastLocation] = useState([route.params.latitude,route.params.longitude])

   /*  const getUpdatedLastLocation = () =>{
         getLastLocation()
            .then((res)=> { res.data.location !== null && setLastLocation(res.data.location)})
            .catch(err=> console.log(err))
    } */

    useEffect(() => {
      /*   getUpdatedLastLocation() */
        console.log("this", lastLocation)
        console.log("infosss", route.params)

        if(route.params.latitude === undefined){
            setErrorMessage(true)
            setTimeout(() => navigation.navigate('MainPage',{params:true}), 1000);
        }
    }, [])

     //If font loaded then render component
     if (!loaded) {
        return null;
    }
  return (

    <View style={styles.container}>
          <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: route.params.latitude || 37.78825,
                    longitude: route.params.longitude ||-122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421}}
                    >
                {route.params.latitude !== undefined &&
                <Marker coordinate={{latitude:route.params.latitude, 
                    longitude:route.params.longitude}}/>
                }
            </MapView>
           

            {/* Open navigation */}
            <Pressable style={
                 ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed ? 0.1: 0.9,
                    shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10} : { translateY:0}]
                    },
                [styles.openMapContainer,  {display: chooseMap ? "none" : "flex",
                                                elevation: chooseMap ? -1 : 1}]]}
                onPress={()=>setChooseMap(true)}
                >
                    <Text style={styles.openMapContainerText}>Start Navigation</Text>
                </Pressable>

            {/* Open Apple Map navigation */}
            <Pressable style={
                 ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed ? 0.1: 0.9,
                    shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10} : { translateY:0}]
                    },
                [styles.openAppleMapContainer, {display: !chooseMap? "none" : "flex", 
                                                elevation: !chooseMap ? -1 : 1}]]}
                onPress={openAppleMapHandler}
                >
                    <Text style={styles.openAppleMapContainerText}>Apple Map?</Text>
                </Pressable>

            {/* Open Google Map navigation */}
            <Pressable style={
                 ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed ? 0.1: 0.9,
                    shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10} : { translateY:0}]
                    },
                [styles.openGoogleMapContainer,  {display: !chooseMap? "none" : "flex", 
                                                    elevation: !chooseMap ? -1 : 1}]]}
                onPress={openGoogleMapHandler}
                >
                    <Text style={styles.openGoogleMapContainerText}>Google Map?</Text>
                </Pressable>
                
                { errorMessage && <ErrorPage errorMessage={errorMessageText}/>}
           
                <GoBackButton/>
               
    </View>
  )
}

//Get screen height and width for responsive
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position:"relative",
    },

    map:{
        width: width,
        height: height,
        justifyContent:"center",
        alignItems:"center",
    },
    
    openMapContainer:{
        position:"absolute",
        top: height *0.8,
        left: width * 0.25,
        width: width * 0.5,
        height: height *0.07,
        borderRadius:30,
        backgroundColor:"#FFCC56",
        justifyContent:"center",
        alignItems:"center",
    },
    
    openMapContainerText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize:width * 0.06,
    },

    openAppleMapContainer:{
        display: "none",
        position:"absolute",
        top: height *0.7,
        left: width * 0.25,
        width: width * 0.5,
        height: height *0.07,
        borderRadius:30,
        backgroundColor:"#FFCC56",
        justifyContent:"center",
        alignItems:"center",
    },
    
    openAppleMapContainerText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize:width * 0.06,
    },

    openGoogleMapContainer:{
        display:"none",
        position:"absolute",
        top: height *0.8,
        left: width * 0.25,
        width: width * 0.5,
        height: height *0.07,
        borderRadius:30,
        backgroundColor:"#FFCC56",
        justifyContent:"center",
        alignItems:"center",
    },
    
    openGoogleMapContainerText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize:width * 0.06,
    },
})
