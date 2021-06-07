import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

export const navigationRef = React.createRef<NavigationContainerRef>();

class RootNavigatorClass {
    isReadyRef = false;

    navigate(screen: string, params?: Record<string, any>) {
        if (this.isReadyRef && navigationRef.current) {
            navigationRef.current?.navigate(screen, params);
        }
    }
    navigation(routeName: string, screenName: string, params?: {}) {
        if (this.isReadyRef && navigationRef.current) {
            navigationRef.current?.navigate(routeName, { screen: screenName, params: { params } });
        }
    }
    replace(navigation: StackNavigationProp<any>, screen: string, params?: Record<string, any>) {
        if (this.isReadyRef && navigation) {
            navigation.replace(screen, params);
        }
    }

    pop() {
        if (this.isReadyRef && navigationRef.current) {
            navigationRef.current?.goBack();
        }
    }
    clear(screenName: string, params?: Record<string, string>) {
        if (this.isReadyRef && navigationRef.current) {
            navigationRef.current?.reset({ index: 0, routes: [{ name: screenName, params: params },] })
        }
    }
}

const RootNavigator = new RootNavigatorClass();
export default RootNavigator;
