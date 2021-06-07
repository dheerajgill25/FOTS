import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator, { navigationRef } from '@navigation/rootnavigation';
import RootStackScreen from '@navigation/RootscreenStack';
import LoadingScreen from "@features/LoadingScreen";
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/reduxModule';
import NetworkInfo from '@libs/netInfo';
import TokenControllerInstance from '@features/login/controllers/token.controller';
import { enableScreens } from 'react-native-screens';
import { Permission, PERMISSIONS_TYPE } from 'libs/functions/Permission';
import AnalyticsFunction from 'behaviour/analytics/AnalyticsService';
import AnalyticsWatcher from 'behaviour/analytics';
import NotificationWatcher from 'behaviour/notifications';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';
import DeviceInfo from 'react-native-device-info';
import CrashReporterInstance from 'libs/crash-reporter/CrashReporter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
declare const global: { HermesInternal: null | {} };
const App = () => {
  let previousRouteName: string | undefined;
  enableScreens(true)

  const allowInDevMode = true;

  const setCrashanalyticsAttributes = async () => {
    const userData = await AsyncStorage.getItem('user');
    console.log("userData", userData)
    if (userData) {
      // CrashReporterInstance.setUserId("userId", userData.id),
      //   CrashReporterInstance.setAttribute('email', userData.emailAddress);
    }
    CrashReporterInstance.setAttribute('deviceType', DeviceInfo.getDeviceType());
    DeviceInfo.getBaseOs().then((baseOs: string) => {
      CrashReporterInstance.setAttribute('OS', baseOs);
    });
    CrashReporterInstance.setAttribute('OSVersion', DeviceInfo.getReadableVersion());
    CrashReporterInstance.setAttribute('appBuildNo', DeviceInfo.getBuildNumber());
  }
  const alertView = () => {
    Alert.alert(
      'Sorry for that',
      `
         We are working on that, please reopen the app
        `,
      [{
        text: 'Ok',
        onPress: () => {
          RNRestart.Restart();
        }
      }]
    );
  }
  /* JS error hadnling */
  const exceptionhandler = async (error: any, isFatal: any) => {
    await setCrashanalyticsAttributes();
    console.log(" JS Error ", error);
    CrashReporterInstance.recordError(error);
    alertView();
  };

  setJSExceptionHandler(exceptionhandler, allowInDevMode);

  /* Native  exception handling */
  setNativeExceptionHandler(async (exceptionString) => {
    await setCrashanalyticsAttributes();
    console.log(" native excetion ", exceptionString);
    CrashReporterInstance.recordError(exceptionString);
    alertView();
  });
  useEffect(() => {
    TokenControllerInstance.setInitialTokens();
    Permission.requestMultiple([
      PERMISSIONS_TYPE.photo,
      PERMISSIONS_TYPE.camera,
    ]);

    return () => {
      RootNavigator.isReadyRef = false;
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            RootNavigator.isReadyRef = true;
            previousRouteName = navigationRef.current?.getCurrentRoute()?.name;
          }}
          onStateChange={async () => {
            const screenName = navigationRef.current?.getCurrentRoute()?.name;
            AnalyticsFunction.functionScreenTracking(
              previousRouteName,
              screenName
            );
          }}
        >
          <NetworkInfo>
            <RootStackScreen />
            <AnalyticsWatcher />
            <NotificationWatcher />
            <LoadingScreen />
          </NetworkInfo>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


export default App;
