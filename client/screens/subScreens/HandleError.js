import React from 'react'
import NetInfo from '@react-native-community/netinfo';


export default getNetworkInfo = () =>{
    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
      
    });
    
    unsubscribe()
    
}