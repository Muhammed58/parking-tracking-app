import React, {useState} from 'react'
import {FAB, Portal, Provider} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import { LOGIN_KEY } from '@env'

const Settings = () => {

    const [actionButton, setActionButton] = useState({ open: false });

    const onStateChange = ({ open }) => setActionButton({ open });

    const { open } = actionButton;

    const navigation = useNavigation()

    const handleProfilePage = () => {
        navigation.navigate('ProfilePage')
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
                        console.log("helloo")
                    }
                }}
                />
            </Portal>
        </Provider>
  )
}

export default Settings