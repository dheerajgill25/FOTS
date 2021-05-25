import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '@features/registerscreen';
import ScreenOptionNavigation from './NavigationBar';
import OrderScreen from '@features/orderScreen/Index';
import CartScreen from 'features/cart/Index';
import HeaderScreenOptionNavigation from './header';
import BeforePayNow from 'features/paynow/Index';
import ThankYouScreen from 'features/thankyou/Index';
import MyAccount from 'features/myaccount/Index';
import HomeStack from './homestack';
import Login from 'features/login/Index';
import OrderScreenSecond from 'features/orderScreentwo/Index';
import MealPlan from 'features/mealplan/Index';

const RootStackNavigator = createStackNavigator();
const RootStackScreen = () => {
    return (
        <RootStackNavigator.Navigator mode="card" initialRouteName={Login.SCREEN_NAME}>
            <RootStackNavigator.Screen
                name={Login.SCREEN_NAME}
                component={Login}
                options={ScreenOptionNavigation({
                    showBackButton: false,
                    showCartIcon: false,
                    showOnlyLogo: true
                })}
            />
            <RootStackNavigator.Screen
                name={Register.SCREEN_NAME}
                component={Register}
                options={ScreenOptionNavigation({
                    showBackButton: false,
                    showCartIcon: false,
                    showOnlyLogo: true
                })}
            />
            <RootStackNavigator.Screen
                name={HomeStack.SCREEN_NAME}
                component={HomeStack}
                options={ScreenOptionNavigation({
                    showBackButton: false,
                    showCartIcon: true,
                    showOnlyLogo: false
                })}
            />

            <RootStackNavigator.Screen
                name={OrderScreen.SCREEN_NAME}
                component={OrderScreen}
                options={ScreenOptionNavigation({
                    showBackButton: false,
                    showCartIcon: true,
                    showOnlyLogo: false
                })}
            />
             <RootStackNavigator.Screen
                name={OrderScreenSecond.SCREEN_NAME}
                component={OrderScreenSecond}
                options={ScreenOptionNavigation({
                    showBackButton: false,
                    showCartIcon: true,
                    showOnlyLogo: false
                })}
            />
            <RootStackNavigator.Screen
                name={CartScreen.SCREEN_NAME}
                component={CartScreen}
                options={HeaderScreenOptionNavigation({
                    showBackButton: true,
                    headerTitle: "Cart"
                })}

            />
            <RootStackNavigator.Screen
                name={BeforePayNow.SCREEN_NAME}
                component={BeforePayNow}
                options={HeaderScreenOptionNavigation({
                    showBackButton: true,
                    headerTitle: "Delivery",
                    showCartIcon: true
                })}

            />
            <RootStackNavigator.Screen
                name={ThankYouScreen.SCREEN_NAME}
                component={ThankYouScreen}
                options={HeaderScreenOptionNavigation({
                    showBackButton: true,
                    headerTitle: "Order Confirmed",
                })}

            />
            <RootStackNavigator.Screen
                name={MyAccount.SCREEN_NAME}
                component={MyAccount}
                options={HeaderScreenOptionNavigation({
                    showBackButton: true,
                    headerTitle: "My Account",
                    showCartIcon: true
                })}

            />  
            <RootStackNavigator.Screen
                name={MealPlan.SCREEN_NAME}
                component={MealPlan}
                options={HeaderScreenOptionNavigation({
                    showBackButton: true,
                    headerTitle: "My Account",
                    showCartIcon: true
                })}

            />
            
        </RootStackNavigator.Navigator>
    );
};

export default RootStackScreen;
