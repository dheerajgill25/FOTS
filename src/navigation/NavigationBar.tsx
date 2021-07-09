
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import Size from '@themes/size/size';
import RootNavigator from './rootnavigation';
import CartIcon from 'components/carticon/Index';
import LogoTitle from '@components/logotitle/Index';
import BackIconDark from 'components/backicon/BackIconDark';

interface ScreenOptionNavigation {
    showBackButton: boolean;
    showCartIcon?: boolean;
    showOnlyLogo: boolean;
    headerLeft?: React.ReactNode;
    headerRight?: React.ReactNode;
}

const ScreenOptionNavigation: any = (props?: ScreenOptionNavigation) => {
    const { showBackButton = false, showCartIcon = false, headerLeft, headerRight, showOnlyLogo, } =
        props || {};
    return {
        headerTitleAlign: "center",
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
                        <BackIconDark />
                    </TouchableOpacity>
                );
            } else if (headerLeft) {
                return headerLeft;
            }
            return null;
        },
        headerTitle: () => <LogoTitle showOnlyLogo={showOnlyLogo} />,
        headerRight: () => {
            if (showCartIcon) {
                return (
                    <CartIcon
                    height={Size.squareButton.size}
                    width={Size.squareButton.size}
                    alignItems='center'
                    justifyContent='center'
                />
                );
            } else if (headerRight) {
                return headerRight;
            }
            return null;
        },
    };
};

export default ScreenOptionNavigation;
