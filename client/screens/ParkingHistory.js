import React, {useState, useEffect} from 'react'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import GoBackButton from './subScreens/GoBackButton';
import moment from 'moment'

import { View, StyleSheet, Dimensions, Text } from 'react-native'

const ParkingHistory = ({route, navigation}) => {

   /* route.params.map((res)=> console.log(res)) */
  const [listOfLocations, setListOfLocations] = useState([])
  useEffect(() => {
    setListOfLocations(route.params.locationList)
  }, [route.params])
  
  return (
    <View style={styles.container}>
        <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: route.params.latitude,
                    longitude: route.params.longitude,
                    latitudeDelta: 0.1922,
                    longitudeDelta: 2.5421}}
                    >
                {listOfLocations.map((value, index)=>{
                    return(
                        <Marker key={index} 
                                title={`${moment(value.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`}
                                coordinate={{latitude:value.location[0], 
                                            longitude:value.location[1]}}/>
                    )
                })}

            </MapView>
            
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
        position:"relative"
    },

    map:{
        width: width,
        height: height,
        justifyContent:"center",
        alignItems:"center",
    },
})
export default ParkingHistory