import React, {useState, useEffect} from 'react'
import { useFonts } from 'expo-font'
import * as Location from 'expo-location';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {View, Text, StyleSheet, Dimensions, ActivityIndicator} from 'react-native'

export default function ParkHere({navigation}){
      //Fonts define
      const[loaded] = useFonts({
        Rakkas: require('../assets/fonts/Rakkas-Regular.ttf')
    })

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location) 
        console.log(location)
    }


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
                }}
                >
                <Text style={{
                    width:width * 0.8,
                    height: height * 0.2,
                    backgroundColor:"white",
                    top: height * 0.3
                }}>{text}</Text>
                <Marker
                    coordinate={{latitude:location.latitude, longitude:location.longitude}}
                    onDragEnd={e=> setLocation(e.nativeEvent.coordinate)}
                    draggable
                >
                </Marker>
            </MapView>
        
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
    },
    map:{
        width: width,
        height: height,
        justifyContent:"center",
        alignItems:"center",
    }

})