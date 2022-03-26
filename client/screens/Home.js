import React, { useState, useEffect }  from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font'
import{ LoginPanel } from './subScreens/forgotPassword.js';

import { ImageBackground, Dimensions, View, 
        StyleSheet,  Keyboard, TouchableWithoutFeedback,
         } from 'react-native';
import SplashScreen from './subScreens/SplashScreen.js';

         

export default function Home({navigation}) {

    //Fonts define
    const[loaded] = useFonts({
        Rakkas: require('../assets/fonts/Rakkas-Regular.ttf')
    })

    // Main page background image path
    const image = require('../assets/images/backgroundCars.jpg')
    
    //isLoading page
    const [isLoading, setisLoading] = useState(true)


    useEffect(() => {
      setTimeout(() => {
          setisLoading(false)
      }, 1000);
    }, [navigation])

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
        <>
        {isLoading === true ? 
        ( <SplashScreen/> 
        
        ):(

        <KeyboardDismiss>

        <View style={styles.mainContainer}>
            <StatusBar translucent={true} backgroundColor="transparent"/>

            <ImageBackground source={image} style={styles.backgroundImage} resizeMode="cover">
         
                <LoginPanel name='LoginPanel' navigation={navigation}/>

            </ImageBackground>
        </View>
        </KeyboardDismiss> 
        
        )}
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

})