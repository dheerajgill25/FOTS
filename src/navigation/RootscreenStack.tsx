import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '@features/registerscreen';
import HomeScreen from '@features/home/Index';
import ScreenOptionNavigation from './NavigationBar';
import OrderScreen from '@features/orderScreen/Index';
import ProductDetailScreen from '@features/productdetail/Index';
import CartScreen from 'features/cart/Index';
import HeaderScreenOptionNavigation from './header';
import BeforePayNow from 'features/paynow/Index';
import ThankYouScreen from 'features/thankyou/Index';
import MyAccount from 'features/myaccount/Index';
import ProductScreen from 'features/products/Index';
import MealPlan from 'features/mealplan/Index';
import BottomTabNavigation from './tabbar';
import HomeStack from './homestack';
import OrderScreenSecond from 'features/orderScreentwo/Index';

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
                name={HomeStack.SCREEN_NAME}
                component={HomeStack}
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
            <RootStackNavigator.Screen
                name={BeforePayNow.SCREEN_NAME}
                component={BeforePayNow}
                options={HeaderScreenOptionNavigation({
                    showBackButton: true,
                })}
                
            />  
              <RootStackNavigator.Screen
                name={ThankYouScreen.SCREEN_NAME}
                component={ThankYouScreen}
                options={HeaderScreenOptionNavigation({
                    showBackButton: true,
                })}
                
            /> 
             <RootStackNavigator.Screen
                name={MyAccount.SCREEN_NAME}
                component={MyAccount}
                options={HeaderScreenOptionNavigation({
                    showBackButton: true,
                })}
                
            />
              <RootStackNavigator.Screen
                name={ProductScreen.SCREEN_NAME}
                component={ProductScreen}
                options={ScreenOptionNavigation({
                    showBackButton: false,
                    showCartIcon: true,
                })}
                
            />
              <RootStackNavigator.Screen
                name={MealPlan.SCREEN_NAME}
                component={MealPlan}
                options={ScreenOptionNavigation({
                    showBackButton: false,
                    showCartIcon: true,
                })}
                
            /> 
               <RootStackNavigator.Screen
                name={OrderScreenSecond.SCREEN_NAME}
                component={OrderScreenSecond}
                options={ScreenOptionNavigation({
                    showBackButton: false,
                    showCartIcon: true,
                })}
                
            /> 
        </RootStackNavigator.Navigator>
    );
};

export default RootStackScreen;
