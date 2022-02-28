import React, {useState} from 'react'
import GoBackButton from './subScreens/GoBackButton'
import {View, Text, Dimensions, StyleSheet, TextInput} from 'react-native'


const data =[
    {
        name:"Muhammet ARSLANTAS",
        email:"muhammedarslantas58@gmail.com",
        gender:"male",
        country:"Turkey"
    }
]

const labels =["Name", "Email", "Gender", "Country"]

const ProfilePage = () => {
  return (
      <View style={styles.container}>
        {labels.map((value,index)=>{
            return(
                <>
                    <Text key={index}>{value}</Text>
                    <TextInput autoCapitalize='words' editable={false}
                        style={styles.inputBoxes}>{data[0].name}</TextInput>
                </>
            )
        })}

       

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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position:"relative"
    },

    inputBoxes:{
        width:250,
        height:50,
        textAlign:"center",
        fontFamily:"Rakkas",
        backgroundColor:"tomato",
        borderWidth:3,
        borderRadius:10
    }

})

export default ProfilePage