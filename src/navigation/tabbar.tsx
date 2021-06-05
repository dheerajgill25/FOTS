import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { StackActions } from '@react-navigation/native';
import HomeScreen from 'features/home/Index';
import MyAccount from 'features/myaccount/Index';
import OrderScreen from 'features/orderScreen/Index';
import OrderScreenSecond from 'features/orderScreentwo/Index';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenOptionNavigation from './NavigationBar';

const Tab = createBottomTabNavigator();
const OrderStack = createStackNavigator();
const resetHomeStackOnTabPress = ({ navigation }: any) => ({
    tabPress: (e: any) => {
        const state = navigation.dangerouslyGetState();
        if (state) {
            const nonTargetTabs = state.routes.filter((r: any) => r.key !== e.target);
            nonTargetTabs.forEach((tab: any) => {
                const tabName = tab?.name;
                const stackKey = tab?.state?.key;
                if (stackKey && tabName) {
                    navigation.dispatch({
                        ...StackActions.popToTop(),
                        target: stackKey,
                    });
                }
            });
        }
    },
});
const orderScreenStack = () => {
    return (
        <OrderStack.Navigator initialRouteName={OrderScreenSecond.SCREEN_NAME}>
            <OrderStack.Screen name={OrderScreenSecond.SCREEN_NAME}
                component={OrderScreenSecond}
                options={{ headerShown: false }} />
            <OrderStack.Screen name={OrderScreen.SCREEN_NAME}
                component={OrderScreen}
                options={{ headerShown: false }} />
        </OrderStack.Navigator>
    )
}
const BottomTabNavigation = () => {
    const SEARCHURL = require("../../assets/images/searchvector.png");
    const HOMEURL = require("../../assets/images/homevector.png");
    const PROFILEURL = require("../../assets/images/uservector.png");
    return (
        <>
            <Tab.Navigator
                lazy={true}
                tabBarOptions={{
                    activeTintColor: "white",
                    inactiveTintColor: "gray",
                    activeBackgroundColor: "#D80000",
                    showLabel: false,
                    tabStyle: { borderRadius: 100, maxWidth: 40, width: 40, height: 40, marginLeft: '18%', marginTop: 4 },
                    style: { width: '100%', backgroundColor: '#fff', paddingBottom: 5 }
                }}

                initialRouteName={HomeScreen.SCREEN_NAME}

            >
                <Tab.Screen
                    name={OrderScreen.SCREEN_NAME}
                    component={orderScreenStack}
                    listeners={(event) => resetHomeStackOnTabPress(event)}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={SEARCHURL}
                                style={{
                                    height: 15,
                                    width: 15,
                                    tintColor: color,
                                }}
                            />
                        ),
                        unmountOnBlur: true,

                    }}

                />
                <Tab.Screen
                    name={HomeScreen.SCREEN_NAME}
                    component={HomeScreen}
                    listeners={(event) => resetHomeStackOnTabPress(event)}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={HOMEURL}
                                style={{
                                    height: 15,
                                    width: 15,
                                    tintColor: color,
                                }}
                            />
                        ),
                        unmountOnBlur: true,
                    }}
                />
                <Tab.Screen
                    name={MyAccount.SCREEN_NAME}
                    component={MyAccount}
                    listeners={(event) => resetHomeStackOnTabPress(event)}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={PROFILEURL}
                                style={{
                                    height: 15,
                                    width: 15,
                                    tintColor: color,
                                }}
                            />
                        ),
                        unmountOnBlur: true,
                    }}
                />
            </Tab.Navigator>
        </>
    )
}
BottomTabNavigation.SCREEN_NAME = 'BottomTabNav';
BottomTabNavigation.navigationOptions = {
    headerShown: false,
};

export default BottomTabNavigation;