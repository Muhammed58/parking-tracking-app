import React ,{ useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLock, faEnvelope, faUser, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import { REGISTER_USER } from "@env"
import { TouchableOpacity, 
    Dimensions, Text, View, StyleSheet,
    TextInput, Platform, LayoutAnimation,
} from 'react-native';



export const registerUser = (props) => {
  
    const navigation = useNavigation()
    const[loaded] = useFonts({
        Rakkas: require('../../assets/fonts/Rakkas-Regular.ttf')
    })

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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [passwordState, setPasswordState] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [userCreated, setUserCreated] = useState(false)
    
    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }

    //handle Sign Up 
    const handleSignUp = async () =>{
        if(!name.trim()){
            alert("Please Enter Name")
        }
        else if(!email.trim()){
            alert("Please Enter Email")
        }
        else if(!passwordState.trim()){
            alert("Please Enter Password")
        }
        else if (repeatPassword === passwordState){
            await axios.post(REGISTER_USER, {
                name: name,
                email: email,
                password: passwordState
            })
            .then(res=>{
                if(res.status === 201){
                    setUserCreated(true)
                    setTimeout(() => { navigation.navigate('MainPage'), 
                                setUserCreated(false) }, 
                                
                                1000); 
                }
                save("user", res.data.token)
                toggleRegisterBox(); 
                props.loginbox("left");
                setName('');
                setEmail('');
                setPasswordState('')
                setRepeatPassword('')
               }
                )
            .catch(err => {
                if(err.response.status === 400) {
                    alert("User already exist")
                    }
                })

        }else{ alert("Password deoesn't match")}
    }
    
    return (
     <View style={[styles.input, registerBoxPosition === 'left'? styles.moveLeft : styles.moveRight]}>
    
         <View style={styles.nameInputBox1}>
             <FontAwesomeIcon icon={ faUser } size ={ 25 } style={ styles.emailIcon }/>
             <TextInput
                 style={styles.emailInput}
                 placeholder={"Name"}
                 textContentType="emailAddress"
                 autoCapitalize="none"
                 value = {name}
                 onChangeText={ value => setName(value)}
                 />
         </View>
         {/* Email input */}
         <View style={styles.emailInputBox1}>
             <FontAwesomeIcon icon={ faEnvelope } size ={ 25 } style={ styles.emailIcon }/>
             <TextInput
                 style={styles.emailInput}
                 placeholder={"Email"}
                 textContentType="emailAddress"
                 autoCapitalize="none"
                 value= {email}
                 onChangeText={ value => setEmail(value)}
                 />
         </View>

         {/* Password Input */}
         <View style={styles.passwordInputBox1}>
             <FontAwesomeIcon icon={ faLock } size ={ 25 } style={ styles.passwordIcon }/>
             <TextInput
                 textContentType ="password"
                 secureTextEntry = { true }
                 style = {styles.passwordInput}
                 value = {passwordState}
                 onChangeText={value2 => setPasswordState(value2)}
                 placeholder={"Password"}
                 />
         </View>
         <View style={styles.repeatPasswordInputBox1}>
             <FontAwesomeIcon icon={ faLock } size ={ 25 } style={ styles.passwordIcon }/>
             { repeatPassword === passwordState ? null : <Text style={styles.passwordMatch}>Password doesn't match</Text> }
             <TextInput
                 textContentType ="password"
                 secureTextEntry = { true }
                 style={styles.passwordInput}
                 value = {repeatPassword}
                 onChangeText={value2 => setRepeatPassword(value2)}
                 placeholder={"Repeat Password"}
                 />
         </View>
         <TouchableOpacity style={styles.signInButton} activeOpacity={.8} onPress={() => handleSignUp()} >
             <Text style={styles.buttonText}>Sign Up</Text>
         </TouchableOpacity>
             
         <Text style={styles.signUpText}>Already have an account?
             <Text style={styles.signUpText2} onPress={ ()=>{toggleRegisterBox(); 
                                                            props.loginbox("left");
                                                            setName('');
                                                            setEmail('');
                                                            setPasswordState('')
                                                            setRepeatPassword('')}}> Sign In </Text> 
         </Text>

         <View style={{
                position:"absolute",
                display:userCreated? "flex":"none",
                width: width * 0.65,
                height: height * 0.13,
                backgroundColor:"#8BDB81",
                justifyContent:"center",
                alignItems:"center",
                borderRadius:30,
                shadowColor:"black", 
                shadowRadius:2,
                shadowOpacity: 0.9,
                shadowOffset:{width:0, height:3},
            }}>
                <Text style={{
                    fontFamily:"Rakkas",
                    fontSize: width * 0.06,
                }}>Succesfully Parked!
                </Text>
                <FontAwesomeIcon icon={faCheckCircle} size={width * 0.1}/>
            </View>
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

    passwordMatch:{
        position:"absolute",
        top: height * 0.08,
        fontFamily:"Rakkas",
        color:"red",
        left: width * 0.21,

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
