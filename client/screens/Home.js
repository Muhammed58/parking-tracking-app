import React, { useState, useEffect }  from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font'
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { SendCode, EnterCode, NewPassword, LoginPanel } from './forgotPassword.js'
import { TouchableOpacity,ImageBackground, 
        Dimensions, Text, View, StyleSheet,
        Image, Keyboard, TouchableWithoutFeedback,
        TextInput, KeyboardAvoidingView, Platform
         } from 'react-native';



export default function Home({navigation}) {

    //Fonts define

    const[loaded] = useFonts({
        Rakkas: require('../assets/fonts/Rakkas-Regular.ttf')
    })

    // Main page background image path
    const image = require('../assets/images/backgroundCars.jpg')
    
    //background man and women images path
    const manImage = require('../assets/images/man.png')
    const womenImage = require('../assets/images/women.png')

    //isLoading page
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setisLoading(true), 2000);
    }, [])

    // Closes the keyboard when clicking anywhere other than input
    const KeyboardDismiss = ({ children }) => (
        <TouchableWithoutFeedback onPress = { ()=> Keyboard.dismiss() }>
            { children }
        </TouchableWithoutFeedback>
    );
    
    //change panel from sign in to reset password
    const [forgotPassword, setforgotPassword] = useState(false)


    if (!loaded) {
        return null;
    }
    return (
        <>
        {isLoading === false ? ( <View style={{top:50, left:50}}><Text>LOADING TEST PAGE</Text></View>)
        
        :(<KeyboardDismiss>

        <View style={styles.mainContainer}>
            <StatusBar translucent={true} backgroundColor="transparent"/>

            <ImageBackground source={image} style={styles.backgroundImage} resizeMode="cover">
         
                  
                <Image style={styles.womenImage} source={womenImage}/>
                <Image style={styles.manImage} source={manImage}/>
           
             {!forgotPassword ? (
                 <LoginPanel name='LoginPanel' displayForgotPassword={setforgotPassword}/>

             ):(
                 
                 <SendCode name='SendCode' displayForgotPassword={setforgotPassword}/>
                 )}

               

            {/*     <EnterCode name='EnterCode'/>
                        
                <NewPassword name='NewPassword'/>  */}
               

            </ImageBackground>
        </View>
        </KeyboardDismiss> )
        }
        </>
    )
}

 //Get screen height and width for responsive
 const width = Dimensions.get('window').width;
 const height = Dimensions.get('window').height;

const styles = StyleSheet.create({

    mainContainer :{
        position:"relative",
        flex: 1,
        elevation:4,
        width: "100%",
        height: "100%",
        backgroundColor: "#FFCC56"
    },

    backgroundImage:{
        flex: 1,
        width: width * 1,
        height: height * 0.6,
        alignItems: "center",
        justifyContent: "center",
    },

    manImage:{
        width: width * 1,
        height:height * 0.5,
        resizeMode: "contain",
        right: Platform.OS === "ios" ? width * -0.25 : width * -0.25,
        top: Platform.OS === "ios" ? height * -0.20 : height * -0.20,
    },

    womenImage:{
        width: width * 1,
        height: height * 0.45,
        resizeMode:"contain",
        right: Platform.OS === "ios" ? width * 0.25 : width * 0.25,
        top: Platform.OS === "ios" ? height * 0.25 : height * 0.24,
    },

    authContainer:{
        flex:1,
        elevation:3,
        width:"100%",
        paddingLeft: "1%",
    },

    input1:{
        position: "relative",
        width: "99%",
        height: height * 0.34,
        top: Platform.OS === "ios" ? height * -0.30: height * -0.30,
        borderRadius: 40,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        elevation:3,
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        justifyContent: "center",
        alignItems: "center",
    },

    emailInputBox:{
        position: "absolute",
        width: "85%",
        height: "20%",
        backgroundColor: "#FFCC56",
        justifyContent: "center",
        borderRadius: 16,
        top: height * 0.03,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation:3,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },

    emailInput:{
        position: "absolute",
        width: "65%",
        height: "70%",
        fontSize: 20,
        fontFamily:"Rakkas",
        left:"25%",
    },

    emailIcon:{
        position:"absolute",
        left: 20,
        opacity: 0.7,
    },

    passwordInputBox:{
        position: "absolute",
        width: "85%",
        height: "20%",
        backgroundColor: "#FFCC56",
        justifyContent: "center",
        borderRadius: 16,
        top: height * 0.12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation:3,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },

    passwordInput:{
        position: "absolute",
        width: "65%",
        height: "70%",
        fontSize: 20,
        fontFamily:"Rakkas",
        left:"25%",
    },

    passwordIcon:{
        position:"absolute",
        left: 20,
        opacity: 0.7,
    },

    forgotPassword:{
        position: "absolute",
        fontFamily: "Rakkas",
        fontSize: 15,
        top: "120%",
        left: "35%",
        color: "gray"
    },

    signInButton:{
        position: "absolute",
        top:"70%",
        width:"50%",
        height:"15%",
        borderRadius:20,
        alignItems:"center",
        backgroundColor:"black",
        justifyContent:"center",
    },
    
    buttonText:{
        position:"absolute",
        fontFamily:"Rakkas",
        color:"#FFCC56",
        fontSize:25,
    },

    signUpText:{
        position:"absolute",
        top:"87%",
        fontSize:15,
        fontFamily:"Rakkas",
    },

    signUpText2:{
        position:"absolute",
        color:"tomato",
        fontSize:15,
        fontFamily:"Rakkas",
    },

})