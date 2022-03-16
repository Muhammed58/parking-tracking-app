import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import Home from './screens/Home.js'
import MainPage from './screens/MainPage.js'
import ParkHere from './screens/ParkHere.js'
import CurrentParking from './screens/CurrentParking.js'
import ParkingHistory from './screens/ParkingHistory.js';
import ProfilePage from './screens/ProfilePage.js';
import { LOGIN_KEY } from '@env'
import { useFonts } from 'expo-font'
import { getProfile, postSignIn } from './api.js'
import { AuthContext } from './screens/subScreens/forgotPassword.js';
import SplashScreen from './screens/subScreens/SplashScreen'

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
 
  //Fonts define
  let [loaded] = useFonts({
    Rakkas: require('./assets/fonts/Rakkas-Regular.ttf')
  })

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          if(action.token){
            SecureStore.setItemAsync(LOGIN_KEY,action.token)
          }
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          SecureStore.deleteItemAsync(LOGIN_KEY)
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'GET_PROFILE':
          return {
            ...prevState,
            isSignout:false,
            name:action.name,
            email:action.email,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync(LOGIN_KEY);
        if(userToken !== null){
          await getProfile(userToken)
          .then(res=> {
             dispatch({ type: 'GET_PROFILE', name: res.data.name, email: res.data.email })
          })
          .catch(err=> console.log("getUserProfileErr", err))
        }
      } catch (e) {
        // Restoring token failed
        console.log("boostrapError", e)
      }
      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
         //SEND LOGIN INFO TO SERVER
        
      await postSignIn(data.enterEmail, data.loginPassword)
        .then((res)=>{
            token = res.data.token
            SecureStore.setItemAsync(LOGIN_KEY, token);
            dispatch({ type: 'SIGN_IN', token: token });
        })
        .catch((err)=>{ console.log(err);})
       
      },
      getUserProfile: async () => {
          userToken = await SecureStore.getItemAsync(LOGIN_KEY);
          if(userToken !== null){
            await getProfile(userToken)
            .then(res=> {
               dispatch({ type: 'GET_PROFILE', name: res.data.name, email: res.data.email })
            })
            .catch(err=> console.log("getUserProfileErr", err))
          }
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  if (state.isLoading || !loaded) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  
  return (
   <NavigationContainer>
      <AuthContext.Provider value={{authContext, state}}>

      <Stack.Navigator screenOptions={ {headerShown: false, gestureEnabled: false} }>
          {state.userToken == null? (
              <Stack.Screen name="Home" component={Home} />
              ) : (
              <>
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="ParkHere" component={ParkHere} />
                <Stack.Screen name="CurrentParking" component={CurrentParking} />
                <Stack.Screen name="ParkingHistory" component={ParkingHistory} />
                <Stack.Screen name="ProfilePage" component={ProfilePage} />
              </>
          )}
      </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
  
}
