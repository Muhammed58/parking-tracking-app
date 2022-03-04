import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useFonts } from 'expo-font'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import openMap from 'react-native-open-maps'
import GoBackButton from './subScreens/GoBackButton.js'

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


     //If font loaded then render component
     if (!loaded) {
        return null;
    }
  return (

    <View style={styles.container}>
          <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: route.params.latitude,
                    longitude: route.params.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421}}
                    >

                <Marker coordinate={{latitude:route.params.latitude, 
                                    longitude:route.params.longitude}}/>
            </MapView>

            {/* Go back to the Main Page */}
                <GoBackButton/>

            {/* Open navigation */}
            <Pressable style={
                 ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed ? 0.1: 0.9,
                    shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10} : { translateY:0}]
                    },
                [styles.openMapContainer,  {display: chooseMap ? "none" : "flex"}]]}
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
                [styles.openAppleMapContainer, {display: !chooseMap? "none" : "flex"}]]}
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
                [styles.openGoogleMapContainer,  {display: !chooseMap? "none" : "flex"}]]}
                onPress={openGoogleMapHandler}
                >
                    <Text style={styles.openGoogleMapContainerText}>Google Map?</Text>
                </Pressable>
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
        position:"relative"
    },

    map:{
        width: width,
        height: height,
        justifyContent:"center",
        alignItems:"center",
    },
    
    openMapContainer:{
      /*   display:"none", */
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
