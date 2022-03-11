import React, { useState, useEffect }  from 'react';
import { faLock, faEnvelope, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';
import RegisterUser from './registerUser.js';
import * as SecureStore from 'expo-secure-store';
import { LOGIN_KEY, LOGIN_URL } from '@env'

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';

import { TouchableOpacity,  
    Dimensions, Text, View, StyleSheet,
    Image, Keyboard, TouchableWithoutFeedback,
    TextInput, KeyboardAvoidingView, Platform,
    LayoutAnimation, UIManager, ActivityIndicator
     } from 'react-native';



     //Layout animasiton setting for android
     if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
      ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
     
          //background man and women images path
    const manImage = require('../../assets/images/man.png')
    const womenImage = require('../../assets/images/women.png')

export const LoginPanel = ({navigation}) =>{
    //Hooks for layout animations of password reset boxes
    const [loginBoxPosition, setLoginBoxPosition] = useState("left");
    const [sendCodePosition, setSendCodePosition] = useState("right");
    const [enterCodePosition, setEnterCodePosition] = useState("right");
    const [registerBoxPosition, setregisterBoxPosition] = useState("right")

    //login info
    const [enterEmail, setEnterEmail] = useState("")
    const [loginPassword, setPassword] = useState("")
    const [invalidErr, setInvalidErr] = useState(false)

    //spinner
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    
    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }

    // HANDLE SIGN IN BUTTON
    const handleSignIn = async() => {
        //START LOADING SPINNER
        setLoadingSpinner(true)
        
        //SEND LOGIN INFO TO SERVER
        await axios.post(LOGIN_URL , {
            email: enterEmail,
            password: loginPassword
        })
        .then((res)=>{
            token = res.data.token
            save(LOGIN_KEY, token)
            navigation.navigate('MainPage')
            
        })
        .catch(()=>{ setInvalidErr(true) })
            
    }


        //Code  confirmation screen
        const CELL_COUNT = 5;
        const [value, setValue] = useState('');
        const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
        const [ props, getCellOnLayoutHandler ] = useClearByFocusCell({
          value,
          setValue,
        });

        //set box layout animations
        const toggleLoginBox = () =>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setLoginBoxPosition(loginBoxPosition === 'left'? 'right' : 'left')
        }
        
        const toggleSendCodeBox = () =>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setSendCodePosition(sendCodePosition === 'right'? 'left' : 'right')
        }

        const toggleEnterCodeBox = () =>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setEnterCodePosition(enterCodePosition === 'right' ? 'left' : 'right')
        }
        

return (
    <TouchableWithoutFeedback onPress = { ()=> Keyboard.dismiss() } >

                    <KeyboardAvoidingView       
                        style={styles.authContainer}
                        keyboardVerticalOffset={5}
                        behavior={ Platform.OS === 'ios'? 'position': 'position'} >
                         
                        <Image style={styles.womenImage} source={womenImage}/>
                        <Image style={styles.manImage} source={manImage}/>
          
        {/* Email and password Auth */}
                        <View style={[loadingSpinner === false ? styles.hiddenLoadingSpinner : styles.loadingSpinner]}>
                            <ActivityIndicator size="large" color= "#064635"/>
                        </View>
                        <View style={[styles.input, loginBoxPosition === 'left'? styles.moveLeft : styles.moveRight]}>
                            <Text style={[invalidErr === true ? styles.invalidErr: styles.validlogin]}>Invalid Email or Password</Text>
                                
                            {/* Email input */}
                            <View style={styles.emailInputBox1}>
                                <FontAwesomeIcon icon={ faEnvelope } size ={ 25 } style={ styles.emailIcon }/>
                                <TextInput
                                    style={styles.emailInput}
                                    placeholder={"Type your email"}
                                    textContentType="emailAddress"
                                    autoCapitalize="none"
                                    onChangeText={ value => setEnterEmail(value)}
                                    value={enterEmail}
                                    />
                            </View>

                            {/* Password Input */}
                            <View style={styles.passwordInputBox1}>
                                <FontAwesomeIcon icon={ faLock } size ={ 25 } style={ styles.passwordIcon }/>
                                <TextInput
                                    textContentType ="password"
                                    secureTextEntry = { true }
                                    style={styles.passwordInput}
                                    onChangeText={value2 => setPassword(value2)}
                                    placeholder={"Type your password"}
                                    value={ loginPassword }
                                    />
                            </View>
                                
                            <TouchableOpacity style={styles.forgotPassword} onPress={()=> {toggleLoginBox(); toggleSendCodeBox(); setEnterEmail('')}} >
                                <Text style={styles.forgotPasswordFont}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.signInButton} activeOpacity={.8} onPress={ ()=>{handleSignIn(); setPassword(''); setEnterEmail('')}} >
                                <Text style={styles.buttonText}>Sign In</Text>
                            </TouchableOpacity>
                                
                            <Text style={styles.signUpText}>Don't have an account?
                                <Text style={styles.signUpText2} onPress={()=> {
                                                            toggleLoginBox();
                                                            setEnterEmail('');
                                                            setPassword('')
                                                            setregisterBoxPosition( registerBoxPosition === "left" ? "right" : "left")}}> Sign Up </Text> 
                            </Text>
                        </View>

                     
        {/* SendCode to the email */}
                        <View style={[styles.input1, styles.box, sendCodePosition === 'right'? null : styles.moveLeft]}>
                            <TouchableOpacity style={styles.goBackContainer} onPress={()=> {toggleLoginBox(); toggleSendCodeBox()}}>
                                <FontAwesomeIcon icon={ faCaretLeft } size ={ 35 } style={ styles.goBackIcon }/>
                                <Text style={styles.goBackText} >Go Back!</Text>
                            </TouchableOpacity>
                            
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

                            <TouchableOpacity style={styles.sendCodeButton} onPress={() =>{toggleEnterCodeBox(); toggleSendCodeBox()}} activeOpacity={.8} >
                                <Text style={styles.buttonText}>Send Code</Text>
                            </TouchableOpacity>  
                        </View>
                       
        {/* enter code from email */}
                        <View style={[styles.input2, enterCodePosition === 'right'? null : styles.moveLeft]}>
                            <TouchableOpacity style={styles.goBackContainer} onPress={()=> {toggleLoginBox(); toggleEnterCodeBox(); setValue()}}>
                                <FontAwesomeIcon icon={ faCaretLeft } size ={ 35 } style={ styles.goBackIcon }/>
                                <Text style={styles.goBackText} >Go Back!</Text>
                            </TouchableOpacity>
                                {/* Email input */}
                            <View style={styles.enterCodeBox}>
                                    <CodeField
                                        ref={ref}
                                        {...props}
                                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                        value={value}
                                        onChangeText={setValue}
                                        cellCount={CELL_COUNT}
                                        keyboardType='number-pad'
                                        rootStyle={styles.codeFieldRoot}
                                        textContentType="oneTimeCode"
                                        renderCell={({index, symbol, isFocused}) => (
                                        <Text
                                            key={index}
                                            style={[styles.cell, isFocused && styles.focusCell]}
                                            onLayout={getCellOnLayoutHandler(index)}>
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                        </Text>
                                    )}/>
                                  
                            </View>
                                    <TouchableOpacity style={styles.sendCodeButton} onPress={()=> { alert(value); setValue()}} activeOpacity={.8} >
                                        <Text style={styles.buttonText}>Enter Code</Text>
                                    </TouchableOpacity>
                            </View>

                            {/* Call Register User Component  */}
                            <RegisterUser boxPosition={registerBoxPosition} loginbox={setLoginBoxPosition}/>

                    </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

)};

 //Get screen height and width for responsive
 const width = Dimensions.get('window').width;
 const height = Dimensions.get('window').height;


const styles = StyleSheet.create({
    moveRight: {
        left: width * 1.1
      },

    moveLeft:{
        left: width * 0
    },

    authContainer:{
        flex:1,
        elevation:3,
        width:"100%",
        paddingLeft: "1%",
    },

    hiddenLoadingSpinner:{
        display:'none',
    },

    loadingSpinner:{
        position: "absolute",
        width: "99%",
        opacity:0.5,
        height: height * 0.37,
        top: Platform.OS === "ios" ? height * 0.60: height * 0.60,
        borderRadius: 40,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        elevation:5,
        zIndex:1,
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        justifyContent: "center",
        alignItems: "center",
    },

    input:{
        position: "relative",
        width: "99%",
        height: height * 0.37,
        top: Platform.OS === "ios" ? height * -0.35: height * -0.35,
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

    invalidErr:{
        position:"absolute",
        fontSize:17,
        color:"red",
        fontFamily:"Rakkas",
        top: width * -0.006,
    },

    validlogin:{
        display:'none',
    },

    emailInputBox1:{
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

    passwordInputBox1:{
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
        elevation:4,
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
        top: height * 0.20,
        width: width * 0.4,
        height: height * 0.05,
        justifyContent:"center",
        alignItems:"center",
    },
    
    forgotPasswordFont:{
        color: "gray",
        fontFamily: "Rakkas",
        fontSize: 15,
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

    input1:{
        position: "relative",
        width: "99%",
        height: height * 0.23,
        left: width * 1.1,
        top: Platform.OS === "ios" ? height * -0.70: height * -0.70,
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
    input2:{
        position: "relative",
        width: "99%",
        height: height * 0.24,
        left: width * 1.1,
        top: Platform.OS === "ios" ? height * -0.95: height * -0.95,
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
        height: "30%",
        backgroundColor: "#FFCC56",
        justifyContent: "center",
        borderRadius: 16,
        top: height * 0.07,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation:3,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    
    sendCodeButton:{
        position: "absolute",
        top:"68%",
        width:"50%",
        height:"25%",
        borderRadius:20,
        alignItems:"center",
        backgroundColor:"black",
        justifyContent:"center",
    },
    
    passwordInputBox:{
        position: "absolute",
        width: "85%",
        height: "20%",
        backgroundColor: "#FFCC56",
        justifyContent: "center",
        borderRadius: 16,
        top: height * 0.08,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation:3,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },

    
    goBackContainer:{
        position:"absolute",
        top: height * 0.02,
        left: height * 0.05,
        height: height *0.04,
        width: width *0.5,
        justifyContent:"center",
        opacity:0.5,
    },
    
    goBackIcon:{
        position:"absolute",
    },
    
    goBackText:{
        position:"absolute",
        fontFamily:"Rakkas",
        fontSize: width * 0.05,
        left: height * 0.06,
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

    enterCodeBox:{
        position: "absolute",
        width: "85%",
        height: "30%",
        justifyContent: "center",
        borderRadius: 16,
        top: height * 0.07,
    },
    
    emailInput:{
        position: "absolute",
        width: "65%",
        height: "70%",
        fontSize: 20,
        fontFamily:"Rakkas",
        left:"25%",
    },

    codeFieldRoot: {
        marginTop: 3,
        justifyContent:'space-evenly'
    },

    cell: {
      width: 50,
      height: 50,
      lineHeight: Platform.OS === "ios" ? height * 0.06 : height * 0.07,
      fontSize: 24,
      borderWidth: 2,
      borderColor: 'black',
      overflow:"hidden",
      backgroundColor:"#FFCC56",
      borderRadius:10,
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
    
})