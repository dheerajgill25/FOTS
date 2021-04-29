
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import Size from '@themes/size/size';
import RootNavigator from './rootnavigation';
import CartIcon from 'components/carticon/Index';
import CartScreen from '@features/cart/Index';
import BackIcon from '@components/backicon/Index';
import BackIconDark from 'components/backicon/BackIconDark';

interface HeaderScreenOptionNavigationProps {
    showBackButton: boolean;
    showCartIcon?: boolean;
    headerLeft?: React.ReactNode;
    headerRight?: React.ReactNode;
    headerTitle?:React.ReactNode;
}

const HeaderScreenOptionNavigation = (props?: HeaderScreenOptionNavigationProps) => {
    const { showBackButton = false, showCartIcon = false, headerLeft, headerRight, headerTitle} =
        props || {};
    return {
        headerStyle: {
            backgroundColor: 'white',
        },
        headerLeftContainerStyle:{
            marginLeft: 10,
        },
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
        headerTitle: () =>  {return headerTitle},
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
                        onPress={()=>CartScreen.navigate()}
                    >
                        <CartIcon  />
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
