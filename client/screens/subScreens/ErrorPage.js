import React from 'react'
import { View, Dimensions, Text } from 'react-native'

export const ErrorPage = ({errorMessage}) => {
     //Get screen height and width for responsive
 const width = Dimensions.get('window').width;
 const height = Dimensions.get('window').height;

  return (
    <View style={{
        position:"absolute",
        backgroundColor:"gray",
        borderRadius: 30,
       /*  opacity: 0.4, */
        justifyContent:"center",
        alignItems:"center",
    }}>
        <View style={{
        position:"absolute",
        backgroundColor:"gray",
        width: width,
        height: height,
        borderRadius: 30,
        opacity: 0.5,
        justifyContent:"center",
        alignItems:"center",
    }}>

        </View>
        <View style={{
            position:"absolute",
            width: width * 0.8,
            height: height * 0.2,
            backgroundColor:"#FFCC56",
            alignItems:"center",
            justifyContent:"center",
            borderRadius: 30,
            shadowColor: "black", 
            shadowRadius: 2,
            shadowOpacity: 0.9,
            shadowOffset: {width:0, height:3},
        }}>
            <Text style={{
                fontFamily:"Rakkas",
                fontSize: width * 0.05,
            }}>{errorMessage}</Text>
        </View>
        
    
    </View>
  )
}
