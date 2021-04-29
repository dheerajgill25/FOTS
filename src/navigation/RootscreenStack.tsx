import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '@features/registerscreen';
import HomeScreen from '@features/home/Index';
import ScreenOptionNavigation from './NavigationBar';
import OrderScreen from '@features/orderScreen/Index';
import ProductDetailScreen from '@features/productdetail/Index';
import CartScreen from 'features/cart/Index';
import HeaderScreenOptionNavigation from './header';

const RootStackNavigator = createStackNavigator();
const RootStackScreen = () => {
    return (
        <RootStackNavigator.Navigator mode="card" initialRouteName="Register">
            <RootStackNavigator.Screen
                name={Register.SCREEN_NAME}
                component={Register}
                options={Register.navigationOptions}
            />

            <RootStackNavigator.Screen
                name={HomeScreen.SCREEN_NAME}
                component={HomeScreen}
                options={ScreenOptionNavigation({
                    showBackButton: true,
                    showCartIcon: true,
                })}
            />

            <RootStackNavigator.Screen
                name={OrderScreen.SCREEN_NAME}
                component={OrderScreen}
                options={ScreenOptionNavigation({
                    showBackButton: true,
                    showCartIcon: true
                })}
            />
            <RootStackNavigator.Screen
                name={ProductDetailScreen.SCREEN_NAME}
                component={ProductDetailScreen}
                options={{
                    headerShown: false
                }}
            />
            <RootStackNavigator.Screen
                name={CartScreen.SCREEN_NAME}
                component={CartScreen}
                options={HeaderScreenOptionNavigation({
                    showBackButton: true,
                })}
                
            />
        </RootStackNavigator.Navigator>
    );
};

export default RootStackScreen;
