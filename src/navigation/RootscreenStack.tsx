import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '@features/registerscreen';
import ScreenOptionNavigation from './NavigationBar';
import CartScreen from 'features/cart/Index';
import HeaderScreenOptionNavigation from './header';
import BeforePayNow from 'features/paynow/Index';
import ThankYouScreen from 'features/thankyou/Index';
import HomeStack from './homestack';
import Login from 'features/login/Index';
import MealPlan from 'features/mealplan/Index';
import ProductDetailScreen from 'features/productdetail/Index';
import { useSelector } from 'react-redux';
import RootStore from 'reduxModule/store/Index';
import ProductScreen from 'features/products/Index';
import EditProfile from 'features/editProfile/Index';
import ChangePassword from 'features/editProfile/changePassword';
import CartCountControllerInstance from 'features/commonApiCall/cartCount/controllers/cartCount.controller';
import GeneralSettingControllerInstance from 'features/commonApiCall/generalSetting/controllers/generalSetting.controller';
import WebhookPaymentScreen from 'features/paynow/payment/Index';
import ProductRating from 'features/rating/Index';
import FaqScreen from 'features/faq/Faq';
import ForgotPassword from 'features/login/screens';

const RootStackNavigator = createStackNavigator();
const RootStackScreen = () => {
    const getToken = useSelector((state: RootStore) => state.TokenInState.data);
    useEffect(() => {
        if (getToken !== '' && getToken !== null && getToken !== undefined && getToken !== {}) {
            CartCountControllerInstance.getCartCount();
            GeneralSettingControllerInstance.generalSetting();
        }
    }, [getToken])
    return (
        <RootStackNavigator.Navigator mode="card" screenOptions={{ animationEnabled: false }} initialRouteName={Login.SCREEN_NAME}>
            {
                getToken !== '' && getToken !== null && getToken !== undefined && getToken !== {} ? (
                    <>
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
                                showBackButton: false,
                                headerTitle: "Order Confirmed",
                            })}

                        />
                        <RootStackNavigator.Screen
                            name={ProductRating.SCREEN_NAME}
                            component={ProductRating}
                            options={ScreenOptionNavigation({
                                showBackButton: true,
                                showCartIcon: true,
                            })}

                        />
                        <RootStackNavigator.Screen
                            name={EditProfile.SCREEN_NAME}
                            component={EditProfile}
                            options={HeaderScreenOptionNavigation({
                                showBackButton: true,
                                headerTitle: "Edit Profile",
                                showCartIcon: false
                            })}

                        />
                        <RootStackNavigator.Screen
                            name={MealPlan.SCREEN_NAME}
                            component={MealPlan}
                            options={ScreenOptionNavigation({
                                showBackButton: true,
                                showCartIcon: true,
                                showOnlyLogo: false
                            })}

                        />
                        <RootStackNavigator.Screen
                            name={ProductDetailScreen.SCREEN_NAME}
                            component={ProductDetailScreen}
                            options={HeaderScreenOptionNavigation({
                                showBackButton: true,
                                headerTitle: "",
                                showCartIcon: false
                            })}

                        />
                        <RootStackNavigator.Screen
                            name={ProductScreen.SCREEN_NAME}
                            component={ProductScreen}
                            options={ScreenOptionNavigation({
                                showBackButton: true,
                                showCartIcon: true,
                                showOnlyLogo: false
                            })}

                        />
                        <RootStackNavigator.Screen
                            name={ChangePassword.SCREEN_NAME}
                            component={ChangePassword}
                            options={HeaderScreenOptionNavigation({
                                showBackButton: true,
                                headerTitle: "Change password",
                                showCartIcon: false
                            })}


                        />
                        <RootStackNavigator.Screen
                            name={WebhookPaymentScreen.SCREEN_NAME}
                            component={WebhookPaymentScreen}
                            options={HeaderScreenOptionNavigation({
                                showBackButton: true,
                                headerTitle: "Payment",
                                showCartIcon: false
                            })}
                        />
                        <RootStackNavigator.Screen
                            name={FaqScreen.SCREEN_NAME}
                            component={FaqScreen}
                            options={HeaderScreenOptionNavigation({
                                showBackButton: true,
                                headerTitle: "FAQ",
                                showCartIcon: false
                            })}
                        />
                    </>
                ) : (
                    <>
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
                                showBackButton: true,
                                showCartIcon: false,
                                showOnlyLogo: true
                            })}
                        />
                         <RootStackNavigator.Screen
                            name={ForgotPassword.SCREEN_NAME}
                            component={ForgotPassword}
                            options={ScreenOptionNavigation({
                                showBackButton: true,
                                showCartIcon: false,
                                showOnlyLogo: true
                            })}
                        />
                    </>
                )
            }


        </RootStackNavigator.Navigator>
    );
};

export default RootStackScreen;
