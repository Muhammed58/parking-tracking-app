import React, {useEffect, useState} from 'react'
import * as SecureStore from 'expo-secure-store';
import { LOGIN_KEY } from '@env'

const auth = () => {
    //if user already logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(async() => {
        let result = await SecureStore.getItemAsync(LOGIN_KEY);
        if (result) { setIsLoggedIn(true) }
    }, []);
    


  return isLoggedIn
}

export default auth;