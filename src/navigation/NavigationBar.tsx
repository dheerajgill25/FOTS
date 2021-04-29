
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import Size from '@themes/size/size';
import RootNavigator from './rootnavigation';
import CartIcon from 'components/carticon/Index';
import LogoTitle from '@components/logotitle/Index';
import MenusIcons from 'components/menusicon/Index';
import CartScreen from 'features/cart/Index';

interface ScreenOptionNavigation {
    showBackButton: boolean;
    showCartIcon?: boolean;
    headerLeft?: React.ReactNode;
    headerRight?: React.ReactNode;
}

const ScreenOptionNavigation = (props?: ScreenOptionNavigation) => {
    const { showBackButton = false, showCartIcon = false, headerLeft, headerRight } =
        props || {};
    return {
        headerStyle: {
            backgroundColor: 'white',
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
                        <MenusIcons />
                    </TouchableOpacity>
                );
            } else if (headerLeft) {
                return headerLeft;
            }
            return null;
        },
        headerTitle: () => <LogoTitle />,
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

export default ScreenOptionNavigation;
