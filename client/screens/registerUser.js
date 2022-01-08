import React ,{ useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLock, faEnvelope, faCaretLeft, faUndo } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


import { TouchableOpacity, 
    Dimensions, Text, View, StyleSheet,
    Image, Keyboard, TouchableWithoutFeedback,
    TextInput, KeyboardAvoidingView, Platform,
    LayoutAnimation, UIManager, ActivityIndicator
     } from 'react-native';

export const registerUser = (props) => {
    const [registerBoxPosition, setRegisterBoxPosition] = useState({...props.boxPosition});

   useEffect(() => {
       /* setRegisterBoxPosition(props.boxPosition) */
       toggleRegisterBox()
   }, [props.boxPosition])

    //set box layout animations
    const toggleRegisterBox = () =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setRegisterBoxPosition(registerBoxPosition === 'right'? 'left' : 'right')
    }

    //handle Sign Up 

    const handleSignUp = () =>{
        
        axios.post('http://localhost:8080/users/', {
            
        })
    }
    
    return (
     <View style={[styles.input, registerBoxPosition === 'left'? styles.moveLeft : styles.moveRight]}>
             
         <View style={styles.nameInputBox1}>
             <FontAwesomeIcon icon={ faEnvelope } size ={ 25 } style={ styles.emailIcon }/>
             <TextInput
                 style={styles.emailInput}
                 placeholder={"NAME"}
                 textContentType="emailAddress"
                 autoCapitalize="none"
                 onChangeText={ value => alert(value)}
                 />
         </View>
         {/* Email input */}
         <View style={styles.emailInputBox1}>
             <FontAwesomeIcon icon={ faEnvelope } size ={ 25 } style={ styles.emailIcon }/>
             <TextInput
                 style={styles.emailInput}
                 placeholder={"EMAIL"}
                 textContentType="emailAddress"
                 autoCapitalize="none"
                 onChangeText={ value => alert(value)}
                 />
         </View>

         {/* Password Input */}
         <View style={styles.passwordInputBox1}>
             <FontAwesomeIcon icon={ faLock } size ={ 25 } style={ styles.passwordIcon }/>
             <TextInput
                 textContentType ="password"
                 secureTextEntry = { true }
                 style={styles.passwordInput}
                 onChangeText={value2 => alert(value2)}
                 placeholder={"PASSWORD"}
                 />
         </View>
         <View style={styles.repeatPasswordInputBox1}>
             <FontAwesomeIcon icon={ faLock } size ={ 25 } style={ styles.passwordIcon }/>
             <TextInput
                 textContentType ="password"
                 secureTextEntry = { true }
                 style={styles.passwordInput}
                 onChangeText={value2 => alert(value2)}
                 placeholder={"Repeat Password"}
                 />
         </View>
         <TouchableOpacity style={styles.signInButton} activeOpacity={.8} onPress={ ()=>{toggleRegisterBox()}} >
             <Text style={styles.buttonText}>Sign Up</Text>
         </TouchableOpacity>
             
         <Text style={styles.signUpText}>Already have an account?
             <Text style={styles.signUpText2} onPress={ ()=>{toggleRegisterBox(); props.loginbox("left")}}> Sign In </Text> 
         </Text>
     </View>

    )
}

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
        height: height * 0.57,
        top: Platform.OS === "ios" ? height * -1.39: height * -1.39,
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

    nameInputBox1:{
        position: "absolute",
        width: "85%",
        height: "13%",
        backgroundColor: "#FFCC56",
        justifyContent: "center",
        borderRadius: 16,
        top: height * 0.02,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation:3,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    emailInputBox1:{
        position: "absolute",
        width: "85%",
        height: "13%",
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

    repeatPasswordInputBox1:{
        position: "absolute",
        width: "85%",
        height: "13%",
        backgroundColor: "#FFCC56",
        justifyContent: "center",
        borderRadius: 16,
        top: height * 0.32,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation:4,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    passwordInputBox1:{
        position: "absolute",
        width: "85%",
        height: "13%",
        backgroundColor: "#FFCC56",
        justifyContent: "center",
        borderRadius: 16,
        top: height * 0.22,
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

    signInButton:{
        position: "absolute",
        top:"75%",
        width:"50%",
        height:"12%",
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
        top:"90%",
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
export default registerUser;
