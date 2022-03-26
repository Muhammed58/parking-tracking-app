import React from 'react'
import NetInfo from '@react-native-community/netinfo';


export default getNetworkInfo = () =>{

    let result;
    const unsubscribe = NetInfo.addEventListener(state => {
        result = state.isInternetReachable
    });
    
    unsubscribe()
    
    return result
}