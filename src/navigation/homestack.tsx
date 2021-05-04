import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RootNavigator from "./rootnavigation";
import BottomTabNavigation from "./tabbar";

const HomeStackNav = createStackNavigator();
const HomeStack = () => {
    return (
        <HomeStackNav.Navigator mode="card">
            <HomeStackNav.Screen
                name={BottomTabNavigation.SCREEN_NAME}
                component={BottomTabNavigation}
                options={BottomTabNavigation.navigationOptions}
            />
        </HomeStackNav.Navigator>
    );
};

HomeStack.SCREEN_NAME = 'HomeStack';
HomeStack.navigate = () => {
    RootNavigator.navigate(HomeStack.SCREEN_NAME);
};
export default HomeStack;