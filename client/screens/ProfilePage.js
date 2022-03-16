import React, {useState} from 'react'
import GoBackButton from './subScreens/GoBackButton'
import {View, Text, Dimensions, StyleSheet, TextInput, Pressable, Image} from 'react-native'
import { AuthContext } from './subScreens/forgotPassword'



const labels =["name", "email", "gender", "country"]
const inputBoxSizes =[ 0.45, 0.57, 0.69, 0.81  ]
const labelSizes =[ 0.4, 0.52, 0.64, 0.76]

const ProfilePage = ({route, navigation}) => {

    const vectorBackground = require('../assets/images/vector.png')
    const userCircleIcon = require('../assets/images/user.png')

    const arriveState = React.useContext(AuthContext)
        console.log(arriveState.state)
  return (
      <View style={styles.container}>
          
          
        <Image style={styles.vectorBackground} 
                source={vectorBackground}/>

        <View style={styles.userNameContainer}>
            <Text style={styles.userNameText}>{arriveState.state.name}</Text>
        </View>

        <View style={styles.userCircleIconContainer}>
            <Image source={userCircleIcon} style={styles.userIcon}/>
        </View>
        {labels.map((value,index)=>{
            return(
                <React.Fragment key={index}>
                    <View style={[styles.inputLabels, { top: height * labelSizes[index]}]}>
                        <Text style={styles.inputLabelText}>{value[0].toUpperCase() + value.substring(1)}</Text>
                    </View>
                    <TextInput autoCapitalize='words' editable={false}
                           style={[styles.inputBoxes,{ top: height * inputBoxSizes[index]}]}>{Object.values(arriveState.state)[index+3]}</TextInput>
                </React.Fragment>
            )
        })}

        <Pressable  style={
            ({pressed}) =>[
                { shadowColor:"black", 
                shadowRadius:2,
                shadowOpacity: pressed? 0.1: 0.9,
                shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                transform:[pressed ? {translateY: 10}:{ translateY:0}]
                },
            styles.updateProfile]}>
            <Text style={styles.updateProfileText}>Update Profile</Text>
        </Pressable>


        <GoBackButton/>
      </View>
  )
}

//Get screen height and width for responsive
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
        flex: 1,
        width:"100%",
        height:"100%",
        backgroundColor: '#FFCC56',
        alignItems: 'center',
        justifyContent:'center',
        position:"relative",
    },

    inputBoxes:{
        position:"absolute",
        width:width * 0.7,
        height:height * 0.06,
        textAlign:"center",
        fontSize:width * 0.04,
        fontFamily:"Rakkas",
        backgroundColor:"white",
        borderWidth:1,
        borderRadius:10,
        shadowColor:'black',
        shadowRadius:2,
        shadowOpacity:0.9,
        shadowOffset:{
            width:1,
            height:3
        }
    },

    inputLabels:{
        position:"absolute",
        padding:10,
        left:width * 0.16,
        borderTopStartRadius:10,
        borderTopEndRadius:10,
    },
    
    inputLabelText:{
        fontFamily:"Rakkas",
        fontSize: width * 0.05
    },
    
    updateProfile:{
        position:"absolute",
        backgroundColor:"tomato",
        top: height * 0.9,
        width: width * 0.7,
        height: height * 0.06,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:15,
    },
    
    updateProfileText:{
        fontFamily:"Rakkas",
        fontSize: width * 0.05,
        color:"white"
    },

    vectorBackground:{
        position:'absolute',
        width: width * 1.5,
        height: height * 0.75,
        top:height * -0.3,
        left: width * -0.01
    },

    userCircleIconContainer:{
        position:"absolute",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#ECECEC',
        top:height * 0.16,
        left: width * 0.5,
        width: 160,
        height: 160,
        borderWidth: 7,
        overflow:"hidden",
        borderRadius: 100,
    },

    userIcon:{
        position:"absolute",
        width: width * 0.28,
        height: height * 0.17,
        top: height * 0.034,
    },
    userNameContainer:{
        position:"absolute",
        width: width * 0.4,
        height: height * 0.15,
        top: height * 0.12,
        left: width *0.05,
        alignItems:"center",
        shadowColor:"gray",
        shadowOpacity:0.5,
        shadowRadius:3,
        shadowOffset:{width:1, height:6},
        justifyContent:"center",
    },

    userNameText:{
        fontFamily:"Rakkas",
        fontSize: width * 0.07,
        textAlign:"center",
    }


})

export default ProfilePage