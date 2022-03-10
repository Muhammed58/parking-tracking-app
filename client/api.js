import React, { useState } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import {LOGIN_KEY, GET_LASTLOCATION, GET_LOCATIONLIST, GET_PROFILE } from '@env'

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
    