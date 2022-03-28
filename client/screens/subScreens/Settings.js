import React, {useState, useEffect} from 'react'
import {FAB, Portal, Provider} from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import { LOGIN_KEY, GET_PROFILE } from '@env'
import { AuthContext } from './forgotPassword';

const Settings = (props) => {

    const [actionButton, setActionButton] = useState({ open: false });

    const onStateChange = ({ open }) => setActionButton({ open });

    const { open } = actionButton;

    const navigation = useNavigation()

    
    const handleProfilePage = () => {
        navigation.navigate('ProfilePage', {props})
    }
    
    const arriveState = React.useContext(AuthContext)
    const handleLogOut = () =>{
        arriveState.authContext.signOut()
    }


  return (
    <Provider>
            <Portal>
                <FAB.Group
                open={open}
                style={{fontFamily:"Rakkas",}}
                fabStyle={{backgroundColor:'black', elevation:10, zIndex:20, borderColor:'lightgray', borderWidth:3}}
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