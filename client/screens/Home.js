import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font'
import { faSearch, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
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

    // Closes the keyboard when clicking anywhere other than input
    const KeyboardDismiss = ({ children }) => (
        <TouchableWithoutFeedback onPress = { ()=> Keyboard.dismiss() }>
            { children }
        </TouchableWithoutFeedback>
    );


    if (!loaded) {
        return null;
    }
    return (
        <KeyboardDismiss>

        <View style={styles.mainContainer}>
            <StatusBar translucent={true} backgroundColor="transparent"/>
            <ImageBackground source={image} style={styles.backgroundImage} resizeMode="cover" >

                    <Image style={styles.womenImage} source={womenImage}/>
                    <Image style={styles.manImage} source={manImage}/>
                   
                    {/* Email and password Auth */}
                    <KeyboardAvoidingView 
                        style={styles.authContainer}
                        keyboardVerticalOffset={85}
                        behavior={ Platform.OS === 'ios'? 'position': "height"} >

                        <View style={styles.input1}>


                                {/* Email input */}
                                <View style={styles.emailInputBox}>
                                    <FontAwesomeIcon icon={ faEnvelope } size ={ 25 } style={ styles.emailIcon }/>
                                    <TextInput
                                        style={styles.emailInput}
                                        placeholder={"Type your email"}
                                        textContentType="emailAddress"
                                        autoCapitalize="none"
                                        />
                                </View>

                                {/* Password Input */}

                                <View style={styles.passwordInputBox}>
                                    <FontAwesomeIcon icon={ faLock } size ={ 25 } style={ styles.passwordIcon }/>
                                    <TextInput
                                        textContentType ="password"
                                        secureTextEntry = {true}
                                        style={styles.passwordInput}
                                        placeholder={"Type your password"}
                                        />
                                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                                </View>

                                <TouchableOpacity style={styles.signInButton} activeOpacity={.8} >
                                    <Text style={styles.buttonText}>Sign In</Text>
                                </TouchableOpacity>
                                
                                <Text style={styles.signUpText}>Don't have an account?
                                    <Text style={styles.signUpText2}>  Sign Up</Text> 
                                </Text>
                            </View>
                        </KeyboardAvoidingView>
            </ImageBackground>
        </View>
        </KeyboardDismiss>
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
        width: "100%",
        height: "60%",
        alignItems: "center",
        justifyContent: "center",
    },

    manImage:{
        width: "70%",
        height:"50%",
        right: width * -0.3,
        top: height * -0.26,
        resizeMode:"contain",
    },

    womenImage:{
        width: "70%",
        height: "50%",
        resizeMode:"contain",
        right: width * 0.22,
        top: height * 0.25,
    },

    authContainer:{
        flex:1,
        elevation:3,
        width:"100%",
        bottom: height * 0.11,
        left: "2%",
        justifyContent:"flex-start",
        backgroundColor: "red",
    },

    input1:{
        position: "relative",
        width: "96%",
        height: height * 0.34,
        top: height * -0.25,
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
        fontSize: 25,
        fontFamily:"Rakkas",
        left:"25%",
    },

    emailIcon:{
        position:"absolute",
        left: 20,
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
        fontSize: 25,
        fontFamily:"Rakkas",
        left:"25%",
    },

    passwordIcon:{
        position:"absolute",
        left: 20,
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