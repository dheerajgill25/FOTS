
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import Size from '@themes/size/size';
import RootNavigator from './rootnavigation';
import CartIcon from 'components/carticon/Index';
import CartScreen from '@features/cart/Index';
import BackIconDark from 'components/backicon/BackIconDark';
import Typography, { FontFamilyFoods } from 'components/typography/Typography';
import { View } from 'react-native';

interface HeaderScreenOptionNavigationProps {
    showBackButton: boolean;
    showCartIcon?: boolean;
    headerLeft?: React.ReactNode;
    headerRight?: React.ReactNode;
    headerTitle?: string;
}

const HeaderScreenOptionNavigation: any = (props?: HeaderScreenOptionNavigationProps) => {
    const { showBackButton = false, showCartIcon = false, headerLeft, headerRight, headerTitle } =
        props || {};
    return {
        headerStyle: {
            backgroundColor: 'white',
        },
        headerLeftContainerStyle: {
            marginLeft: 10,
        },
        headerTitleAlign: "center",
        headerLeft: () => {
            if (showBackButton) {
                return (
                    <TouchableOpacity
                        style={{
                            height: Size.squareButton.size,
                            width: Size.squareButton.size,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => RootNavigator.pop()}
                    >
                        <BackIconDark />
                    </TouchableOpacity>
                );
            } else if (headerLeft) {
                return headerLeft;
            }
            return null;
        },
        headerTitle: () => {
            return (<View>
                {!!headerTitle && <Typography style={{ fontFamily: FontFamilyFoods.POPPINSMEDIUM, textAlign: 'center', fontSize: 18, color: '#D80009', }}>{headerTitle}</Typography>}
            </View>)
        },
        headerRight: () => {
            if (showCartIcon) {
                return (
                    <TouchableOpacity
                        style={{
                            height: Size.squareButton.size,
                            width: Size.squareButton.size,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => CartScreen.navigate()}
                    >
                        <CartIcon />
                    </TouchableOpacity>
                );
            } else if (headerRight) {
                return headerRight;
            }
            return null;
        },
    };
};

export default HeaderScreenOptionNavigation;
