import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import{ Pressable, Dimensions, Text, StyleSheet, } from 'react-native'

const GoBackButton = () => {

    const navigation = useNavigation()
     /* GoBack onPress Handler */
     const goBackHandler = () =>{
        navigation.navigate('MainPage')
    }
    
  return (
        <Pressable style={
                 ({pressed}) =>[
                    { shadowColor:"black", 
                    shadowRadius:2,
                    shadowOpacity: pressed ? 0.1: 0.9,
                    shadowOffset: pressed ? {width:0, height:1} : {width:0, height:3},
                    transform:[pressed ? {translateY: 10} : { translateY:0}]
                    },
                styles.goBackContainer]}
                onPress={goBackHandler}
                >
                    <FontAwesomeIcon icon={faCaretLeft} size={40} style={styles.goBackIcon}/>
                    <Text style={styles.goBackText}>Go Back</Text>
        </Pressable>


  )
}


//Get screen height and width for responsive
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({

    goBackContainer:{
        position:"absolute",
        top: height *0.06,
        left: width * 0.04,
        width: width * 0.3,
        height: height *0.05,
        borderRadius:30,
        backgroundColor:"#FFCC56",
        justifyContent:"center",
    },
    
    goBackIcon:{
        position:"absolute",
        opacity:0.9,
    },
    
    goBackText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize:width * 0.049,
        left: width * 0.1
    },
})

export default GoBackButton