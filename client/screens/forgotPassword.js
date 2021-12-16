import React, { useState, useEffect }  from 'react';
import { faLock, faEnvelope, faCaretLeft, faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import CodeInput from 'react-native-code-input';
import { TouchableOpacity,ImageBackground, 
    Dimensions, Text, View, StyleSheet,
    Image, Keyboard, TouchableWithoutFeedback,
    TextInput, KeyboardAvoidingView, Platform
     } from 'react-native';




export const LoginPanel = (props) =>{
   
return (
    <TouchableWithoutFeedback onPress = { ()=> Keyboard.dismiss() }>

                    <KeyboardAvoidingView       
                        style={styles.authContainer}
                        keyboardVerticalOffset={5}
                        behavior={ Platform.OS === 'ios'? 'position': "position"} >
                         
                        {/* Email and password Auth */}
                        <View style={styles.input}>

                                {/* Email input */}
                                <View style={styles.emailInputBox1}>
                                    <FontAwesomeIcon icon={ faEnvelope } size ={ 25 } style={ styles.emailIcon }/>
                                    <TextInput
                                        style={styles.emailInput}
                                        placeholder={"Type your email"}
                                        textContentType="emailAddress"
                                        autoCapitalize="none"
                                        />
                                </View>

                                {/* Password Input */}
                                <View style={styles.passwordInputBox1}>
                                    <FontAwesomeIcon icon={ faLock } size ={ 25 } style={ styles.passwordIcon }/>
                                    <TextInput
                                        textContentType ="password"
                                        secureTextEntry = { true }
                                        style={styles.passwordInput}
                                        placeholder={"Type your password"}
                                        />

                                        <TouchableOpacity style={styles.forgotPassword}>
                                            <Text style={styles.forgotPassword} onPress={() => props.displayForgotPassword(true)}>Forgot Password?</Text>
                                        </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={styles.signInButton} activeOpacity={.8} >
                                    <Text style={styles.buttonText}>Sign In</Text>
                                </TouchableOpacity>
                                
                                <Text style={styles.signUpText}>Don't have an account?
                                    <Text style={styles.signUpText2}>  Sign Up</Text> 
                                </Text>
                            </View>
                        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

)};



export const SendCode = (props) =>{
return(
    <TouchableWithoutFeedback onPress = { ()=> Keyboard.dismiss() }>
         <KeyboardAvoidingView 
                        style={styles.authContainer}
                        keyboardVerticalOffset={5}
                        behavior={ Platform.OS === 'ios'? 'position': "position"} >
                         
                        {/* Email and password Auth */}
                        <View style={styles.input1}>
                            <View style={styles.goBackContainer}>
                                <FontAwesomeIcon icon={ faCaretLeft } size ={ 35 } style={ styles.goBackIcon }/>
                                <Text style={styles.goBackText} onPress={()=>{props.displayForgotPassword(false)}} >Go Back!</Text>
                            </View>
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

                                <TouchableOpacity style={styles.sendCodeButton} activeOpacity={.8} >
                                    <Text style={styles.buttonText}>Send Code</Text>
                                </TouchableOpacity>
                               
                            </View>
                        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
)};


//Set and check pin code
/* const [pinCode, setPinCode] = useState(""); */

export const EnterCode = () =>(
    <TouchableWithoutFeedback onPress = { ()=> Keyboard.dismiss() }>
         <KeyboardAvoidingView 
                        style={styles.authContainer}
                        keyboardVerticalOffset={5}
                        behavior={ Platform.OS === 'ios'? 'position': "position"} >
                         
                        {/* Email and password Auth */}
                        <View style={styles.input2}>
                            <View style={styles.goBackContainer}>
                                <FontAwesomeIcon icon={ faCaretLeft } size ={ 35 } style={ styles.goBackIcon }/>
                                <Text style={styles.goBackText}>Go Back!</Text>
                            </View>
                                {/* Email input */}
                                <View style={styles.emailInputBox}>
                                    <CodeInput
                                          size={50}
                                          secureTextEntry
                                          autoFocus={false}
                                          activeColor='black'
                                          inactiveColor='gray'
                                          inputPosition='center'
                                          containerStyle={{ marginTop: 5 }}
                                          codeInputStyle={{ borderWidth: 1.5, borderRadius:10 }}
                                        />
                                </View>

                                <TouchableOpacity style={styles.sendCodeButton} activeOpacity={.8} >
                                    <Text style={styles.buttonText}>Enter Code</Text>
                                </TouchableOpacity>
                               
                            </View>
                        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
);
export const NewPassword = () =>(
    <TouchableWithoutFeedback onPress = { ()=> Keyboard.dismiss() }>
         <KeyboardAvoidingView 
                        style={styles.authContainer}
                        keyboardVerticalOffset={5}
                        behavior={ Platform.OS === 'ios'? 'position': "position"} >
                         
                        {/* Email and password Auth */}
                        <View style={styles.input3}>
                            <View style={styles.goBackContainer}>
                                <FontAwesomeIcon icon={ faCaretLeft } size ={ 35 } style={ styles.goBackIcon }/>
                                <Text style={styles.goBackText}>Go Back!</Text>
                            </View>

                                 {/* Password Input */}
                                 <View style={styles.passwordInputBox}>
                                    <FontAwesomeIcon icon={ faLock } size ={ 25 } style={ styles.passwordIcon }/>
                                    <TextInput
                                        textContentType ="password"
                                        secureTextEntry = {true}
                                        style={styles.passwordInput}
                                        placeholder={"New password"}
                                        />
                                </View>
                                 <View style={styles.passwordInputBox2}>
                                    <FontAwesomeIcon icon={ faUndo } size ={ 25 } style={ styles.passwordIcon }/>
                                    <TextInput
                                        textContentType ="password"
                                        secureTextEntry = {true}
                                        style={styles.passwordInput}
                                        placeholder={"Confirm new password"}
                                        />
                                </View>

                                <TouchableOpacity style={styles.sendCodeButton2} activeOpacity={.8} >
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                               
                            </View>
                        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
);



 //Get screen height and width for responsive
 const width = Dimensions.get('window').width;
 const height = Dimensions.get('window').height;


const styles = StyleSheet.create({

    authContainer:{
        flex:1,
        elevation:3,
        width:"100%",
        paddingLeft: "1%",
    },

    input:{
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

    input1:{
        position: "relative",
        width: "99%",
        height: height * 0.23,
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
    input2:{
        position: "relative",
        width: "99%",
        height: height * 0.24,
        top: Platform.OS === "ios" ? height * -0.50: height * -0.30,
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
    
    buttonText:{
        position:"absolute",
        fontFamily:"Rakkas",
        color:"#FFCC56",
        fontSize:25,
    },
    
    input3:{
        position: "relative",
        width: "99%",
        height: height * 0.35,
        top: Platform.OS === "ios" ? height * -0.85: height * -0.30,
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
    passwordInputBox2:{
        position: "absolute",
        width: "85%",
        height: "20%",
        backgroundColor: "#FFCC56",
        justifyContent: "center",
        borderRadius: 16,
        top: height * 0.17,
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
    
    sendCodeButton2:{
        position: "absolute",
        top:"75%",
        width:"50%",
        height:"20%",
        borderRadius:20,
        alignItems:"center",
        backgroundColor:"black",
        justifyContent:"center",
    },
    
    goBackContainer:{
        position:"absolute",
        top: height * 0.02,
        justifyContent:"center",
        opacity:0.5,
    },
    
    goBackIcon:{
        position:"absolute",
        left: height * -0.16,
    },
    
    goBackText:{
        fontFamily:"Rakkas",
        fontSize: width * 0.05,
        left: height * -0.1,
    }
    
})