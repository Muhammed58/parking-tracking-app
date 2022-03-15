import React, {useState, useEffect} from 'react'
import {FAB, Portal, Provider} from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import { LOGIN_KEY, GET_PROFILE } from '@env'
import { AuthContext } from './forgotPassword';

const Settings = () => {

    const [actionButton, setActionButton] = useState({ open: false });

    const onStateChange = ({ open }) => setActionButton({ open });

    const { open } = actionButton;

    const navigation = useNavigation()
    const route = useRoute()


    //get profile information
    const [profile, setProfile] = useState({})
    /* useEffect(async() => {
        let token = await SecureStore.getItemAsync(LOGIN_KEY);
        await axios.get(GET_PROFILE,{ headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{
            setProfile(res.data)
        })
        .catch(err => console.log(err))
    }, [route]) */
    
    
    const handleProfilePage = () => {
        navigation.navigate('ProfilePage', {profile})
    }
    
    const { signOut } = React.useContext(AuthContext);
    const handleLogOut = () =>{
        signOut()
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