import React, {useState, useEffect} from 'react'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import GoBackButton from './subScreens/GoBackButton';
import { ErrorPage } from './subScreens/ErrorPage.js';
import moment from 'moment'
import getNetworkInfo from './subScreens/HandleNetworkError.js'
import { deleteLocationRequest, getLastLocation, getLocationList } from '../api.js'

import { View, StyleSheet, Dimensions, Text, Pressable } from 'react-native'




const ParkingHistory = ({route, navigation}) => {

    // LOCATIONS TO BE DELETED
    const [deleteLocation, setDeleteLocation] = useState('')
    const [wantDelete, setWantDelete] = useState(false)
    const [displayOptions, setDisplayOptions] = useState(false)
    

    const handleDeleteLocation = async() =>{
        setCheckLastLocation(checkLastLocation? false : true)
        await deleteLocationRequest(deleteLocation)        
        .then(()=>{ setDisplayOptions(false); 
                    getUpdatedLocations();
                    setCheckInternetConnection( checkInternetConnection? false : true)
                })
        .catch((err)=>{console.log(err)})
    }


    
    // GET UPDATED LOCATION LIST AFTER DELETE ONE
    const getUpdatedLocations = async() =>{
         await getLocationList()
            .then((res) => { setListOfLocations(res.data);})
            .catch(err=> console.log(err))
    }



    //HANDLE ERROR MESSAGES
    const [errorMessage, setErrorMessage] = useState(false)
    const [errorMessageText, setErrorMessageText] = useState('Error')

    // HANDLE INTERNET CONNECTION ERROR
    const [checkInternetConnection, setCheckInternetConnection] = useState(false)
    useEffect(() => {
       if(getNetworkInfo() === false){
            setErrorMessage(true)
            setErrorMessageText('Check Your Internet Connection!')
       }
    }, [checkInternetConnection])

    // SET LAST LOCATION DATA
    const [lastLocation, setLastLocation] = useState([route.params.latitude, route.params.longitude])
    const [checkLastLocation, setCheckLastLocation] = useState(false)
    useEffect(() => {
            getLastLocation()            
            .then((res) => {setLastLocation(res.data.location);})
            .catch(err=> {console.log(err);})
            console.log("it works")
            console.log("last location ", lastLocation)
        }, [checkLastLocation])


   


    // LOCATION LIST
    const [listOfLocations, setListOfLocations] = useState(route.params.locationList)
    useEffect(() => {
        if(listOfLocations.length === 0){
            setErrorMessage(true)
            setErrorMessageText('Location Not found!')
            setTimeout(() => navigation.navigate('MainPage',{params:true}), 1000);
        } 
    }, [listOfLocations])



  return (
      
    <View style={styles.container}>


        <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: lastLocation[0],
                    longitude: lastLocation[1],
                    latitudeDelta: 0.1922,
                    longitudeDelta: 2.5421}}
                    >
                        
                {listOfLocations.map((value, index)=>{

                    return(

                        <Marker key={index} 
                                title={`${moment(value.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`}
                                coordinate={{latitude:value.location[0], 
                                            longitude:value.location[1]}}
                                onPress={()=> {setDeleteLocation(value._id), setWantDelete(true), setDisplayOptions(false)}}
                            />
                    )

                })}
                
        </MapView>


          {wantDelete &&  <Pressable style={
                 ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed ? 0.1: 0.9,
                    shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10} : { translateY:0}]
                    }, 
                [styles.deleteLocation]]}
                onPress={()=>{setDisplayOptions(true),setWantDelete(false)}}
                >

                    <Text style={styles.deleteLocationText}>Delete this location?</Text>
                
                </Pressable>}

            
            {displayOptions && <Pressable style={
                 ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed ? 0.1 : 0.9,
                    shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10} : { translateY:0}]
                    },
                [styles.cancelDeleteContainer]]}
                onPress={()=> {setDisplayOptions(false), setWantDelete(true)}}
                >
                    
                    <Text style={styles.cancelDeleteContainerText}>Cancel</Text>
                
                </Pressable>
            }
            

            {displayOptions && <Pressable style={
                 ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed ? 0.1: 0.9,
                    shadowOffset: pressed ? {width:0, hight:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10} : { translateY:0}]
                    },
                [styles.allowDeleteContainer]]}
                onPress={handleDeleteLocation}
                >
                    <Text style={styles.allowDeleteContainerText}>Delete</Text>
                </Pressable>}

          
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
        position:"relative"
    },

    map:{
        width: width,
        height: height,
        justifyContent:"center",
        alignItems:"center",
    },
    deleteLocation:{
        position:"absolute",
        top: height * 0.8,
        left: width * 0.18,
        width: width * 0.6,
        height: height * 0.06,
        borderRadius: 30,
        backgroundColor:"#FFCC56",
        justifyContent:"center",
        alignItems:"center",
    },
    
    deleteLocationText:{
        position:'absolute',
        fontFamily:"Rakkas",
        fontSize: width * 0.05,
    },

    cancelDeleteContainer:{
        position:"absolute",
        top: height *0.7,
        left: width * 0.25,
        width: width * 0.5,
        height: height * 0.07,
        borderRadius:30,
        backgroundColor:"#FFCC56",
        justifyContent:"center",
        alignItems:"center",
    },
    
    cancelDeleteContainerText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize:width * 0.06,
    },

    allowDeleteContainer:{
        position:"absolute",
        top: height *0.8,
        left: width * 0.25,
        width: width * 0.5,
        height: height *0.07,
        borderRadius:30,
        backgroundColor:"tomato",
        justifyContent:"center",
        alignItems:"center",
    },
    
    allowDeleteContainerText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize:width * 0.06,
    },

})
export default ParkingHistory