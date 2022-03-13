import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import {LOGIN_KEY, GET_LASTLOCATION, GET_LOCATIONLIST, REGISTER_USER, 
    GET_PROFILE, POST_LOCATION, DELETE_LOCATION, LOGIN_URL } from '@env'

// ************* SEND LOGIN INFORMATION TO SERVER *************
export const postSignIn = async(enterEmail, loginPassword) =>{
    await axios.post(LOGIN_URL, { email: enterEmail, password: loginPassword })
}

// ************* SET LAST LOCATION DATA *************
export const postSignUp = async(name, email, passwordState ) =>{
    await axios.post(REGISTER_USER, { name: name, email: email, password: passwordState})
}


// ************* SET LAST LOCATION DATA *************
export const getLastLocation =  async () =>{
    let token = await SecureStore.getItemAsync(LOGIN_KEY);
    return await axios.get(GET_LASTLOCATION, { headers: {"Authorization" : `Bearer ${token}`} })
}

// ************* GET LIST OF LOCATIONS *************
export const getLocationList = async()=>{
    let token = await SecureStore.getItemAsync(LOGIN_KEY);
    return await axios.get(GET_LOCATIONLIST, { headers: {"Authorization" : `Bearer ${token}`} })
}

// ************* GET PROFILE INFORMATION *************
export const getProfile = async() =>{
    let token = await SecureStore.getItemAsync(LOGIN_KEY);
    await axios.get(GET_PROFILE,{ headers: {"Authorization" : `Bearer ${token}`} })
}

// ************* SEND PARKING COORDINATES *************
export const sendLocation = async(latitude,longitude) =>{
    let token = await SecureStore.getItemAsync(LOGIN_KEY);
    await axios.post( POST_LOCATION, { locationInfo: [latitude, longitude]},{ headers: {"Authorization" : `Bearer ${token}`} })
}

// ************* SEND PARKING COORDINATES *************
export const deleteLocationRequest = async(deleteLocation) =>{
    let token = await SecureStore.getItemAsync(LOGIN_KEY);
    await axios.delete(DELETE_LOCATION + deleteLocation,{ headers: {"Authorization" : `Bearer ${token}`}})
}