import React, {useState, useEffect} from 'react'
import {FAB, Portal, Provider} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import { LOGIN_KEY, GET_PROFILE } from '@env'

const Settings = () => {

    const [actionButton, setActionButton] = useState({ open: false });

    const onStateChange = ({ open }) => setActionButton({ open });

    const { open } = actionButton;

    const navigation = useNavigation()

    
    
    //get profile information
    const [profile, setProfile] = useState({})
    useEffect(async() => {
        let token = await SecureStore.getItemAsync(LOGIN_KEY);
        await axios.get(GET_PROFILE,{ headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{
            setProfile(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    
    
    const handleProfilePage = () => {
        navigation.navigate('ProfilePage', {profile})
    }
    
    const handleLogOut = () =>{
        SecureStore.deleteItemAsync(LOGIN_KEY)
                    .then(navigation.navigate('Home'))
    }


  return (
    <Provider>
            <Portal>
                <FAB.Group
                open={open}
                style={{fontFamily:"Rakkas",}}
                fabStyle={{backgroundColor:'black', borderColor:'lightgray', borderWidth:3}}
                color='#FFCC56'
                icon={open ? 'close' : 'account'}
                actions={[
                    {
                    icon: 'account',
                    label: 'Profile',
                    
                    labelStyle:{borderColor:"black", borderWidth:3},
                    color:"black",
                    onPress: () => handleProfilePage(),
                    },
                    {
                    icon: 'logout',
                    label: 'Log Out',
                    labelStyle:{borderColor:"black", borderWidth:3},
                    color:"black",
                    onPress: () => handleLogOut(),
                    small: false,
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                    }
                }}
                />
            </Portal>
        </Provider>
  )
}

export default Settings