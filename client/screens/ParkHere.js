import React, {useState, useEffect} from 'react'
import { useFonts } from 'expo-font'
import * as Location from 'expo-location';
import {  faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { POST_LOCATION, LOGIN_KEY } from '@env'
import GoBackButton from './subScreens/GoBackButton.js'

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {View, Text, StyleSheet, 
        Dimensions, ActivityIndicator, Pressable,
        Platform
    
    } from 'react-native'

export default function ParkHere({navigation}){
      //Fonts define
      const[loaded] = useFonts({
        Rakkas: require('../assets/fonts/Rakkas-Regular.ttf')
    })

    //Handle with location
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({
            maximumAge: 60000, // only for Android
            accuracy: Platform.OS === "android" ? Location.Accuracy.Low : Location.Accuracy.Lowest,
        });
        setLocation(location.coords);
      })();
    }, []);

/* If parked succesfully */
    const [isParked, setIsParked] = useState(false)

/* Handle Post Location Info with User ID  */
    const handlePostLocation = async() =>{
        let token = await SecureStore.getItemAsync(LOGIN_KEY);
        await axios.post( POST_LOCATION, {
            locationInfo: [location.latitude, location.longitude]
        },{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(() => {
            setIsParked(true)
            setTimeout(() => navigation.navigate('MainPage'), 1000);
        })
        .catch(err=> console.log(err))
    }

    //If font loaded then render component
    if (!loaded) {
        return null;
    }
    return (
        <>
        {!location ? ( <View style={{
            alignItems:"center", 
            justifyContent:"center",
            width:"100%",
            height:"100%",
            backgroundColor:"#FFCC56"
            }}>
        <Text style={{fontSize:25, fontFamily:"Rakkas", bottom:20}}>Loading...</Text>
        <ActivityIndicator size="large" color= "#064635"/>
    </View>)

:   (
        <View style={styles.container}>
            <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>

        {/* Pin your current/selected location */}
                <Marker
                    coordinate={{latitude:location.latitude, longitude:location.longitude}}
                    onDragEnd={e=> setLocation(e.nativeEvent.coordinate)}
                    draggable
                />
                
            </MapView>

        {/* Go back to the Main Page */}
            <GoBackButton/>

        { isParked ?(
  
            <View style={{
                position:"absolute",
                width: width * 0.65,
                height: height * 0.13,
                backgroundColor:"#8BDB81",
                justifyContent:"center",
                alignItems:"center",
                borderRadius:30,
                shadowColor:"black", 
                shadowRadius:2,
                shadowOpacity: 0.9,
                shadowOffset:{width:0, height:3},
            }}>
                <Text style={{
                    fontFamily:"Rakkas",
                    fontSize: width * 0.06,
                }}>Succesfully Parked!
                </Text>
                <FontAwesomeIcon icon={faCheckCircle} size={width * 0.1}/>
            </View>
        ) : (
          <View style={styles.buttonContainer}>
             <Pressable style={
                 ({pressed}) =>[
                     { shadowColor:"black", 
                     shadowRadius:2,
                     shadowOpacity: pressed? 0.1: 0.9,
                     shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                     transform:[pressed ? {translateY: 10}:{ translateY:0}]
                    },
                    styles.parkHereButton]}
                    onPress={handlePostLocation}
                    >
                       
                   <Text style={styles.parkHereButtonText}>Park Here</Text>
               </Pressable>

                <View style={styles.chooseLocationButton}>
                   <Text style={styles.chooseLocationButtonText}>Hold the pin and drag to select different location</Text>
               </View>
            </View>
        )}
       
        
        </View>
    )}
    </>
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

    buttonContainer:{
        position:"absolute",
        top: height * 0.7,
        width: width * 0.6,
        height: height * 0.17,
        alignItems:"center",
    },
    parkHereButton:{
        position:"absolute",
        top: height * 0.01,
        width: width * 0.6,
        height: height *0.06,
        borderRadius:30,
        backgroundColor:"#FFCC56",
        justifyContent:"center",
        alignItems:"center",
    },
    
    parkHereButtonText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize: width * 0.07,
    },
    
    chooseLocationButton:{
        position:"absolute",
        top: height * 0.1,
        width: width * 0.6,
        height: height *0.08,
        borderRadius:10,
        paddingLeft:width *0.01,
        paddingRight: width * 0.01,
        backgroundColor:"#FFCC56",
        justifyContent:"center",
        alignItems:"center",
        shadowColor:"black", 
        shadowRadius:2,
        shadowOpacity:0.9,
        shadowOffset: {width:0, height:3},
    },

    chooseLocationButtonText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize: width * 0.05,
        textAlign:"center",
    },


})