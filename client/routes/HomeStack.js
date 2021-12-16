import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home.js";

const screens = {
    Home: {
        screen: Home
    },
}

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);