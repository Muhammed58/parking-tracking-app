import React, { useState, useEffect }  from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { View, Text, TouchableOpacity} from 'react-native';




export default function MainPage ({route, navigation}) {

    const [userProfile, setUserProfile] = useState({})

    const config = {
        headers:{authorization:`Bearer ${route.params.token}`}
    }

  

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
          alert("🔐 Here's your value 🔐 \n" + result);
        } else {
          alert('No values stored under that key.');
        }
    }
    
    useEffect(() => {
        axios.get('http://localhost:8080/users/profile', config)
            .then((res)=>{setUserProfile(res.data)})
            .catch((err)=>alert(err))

    }, [])

    return(
        <View style={{
            width:"100%",
            height:"100%",
            alignItems:"center",
            justifyContent:"center",
        }}>
            <Text>Main Page</Text>
            <Text style={
                {
                    width:'60%',
                    top:30,
                }
            }>ID: {userProfile._id}</Text>
            <Text style={
                {
                    width:'60%',
                    top:30,
                }
            }> Name: {userProfile.name}</Text>
            <Text style={
                {
                    width:'60%',
                    top:30,
                }
            }>Email: {userProfile.email}</Text>

            <TouchableOpacity style={{
                width: '60%',
                height:50,
                justifyContent:"center",
                alignItems:"center",
                top:40,
                backgroundColor:"tomato"
            }}
            onPress={()=> getValueFor("ahmetToken") }>
                <Text>Click and display token</Text>
            </TouchableOpacity>

        </View>
    )


}