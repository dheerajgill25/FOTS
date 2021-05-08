import React from 'react';
import { SafeAreaView, View } from 'react-native';
export interface NavigationBarProps {
    backIcon?: boolean;
    backIconAction?: () => void;
    leftIcon?: React.ReactChild;
    cartIcon?: boolean;
    rightIcon?: React.ReactChild;
}

interface BaseScreenProps {
    navigatorBarOptions?: NavigationBarProps;
    children: React.ReactNode;
}
interface BaseScreenState {}

const BaseScreen = ({ navigatorBarOptions, children }: BaseScreenProps) => {
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{  width: '100%', backgroundColor: 'white' }} />
                {children}
            </SafeAreaView>
        </View>
    );
};

export default BaseScreen;
