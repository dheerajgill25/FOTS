import React, { useEffect, useRef } from 'react';
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
import NotificationWatcher from 'behaviour/notifications';
import AnalyticsWatcher from 'behaviour/analytics';
import AnalyticsFunction from 'behaviour/analytics/AnalyticsService';
declare const global: { HermesInternal: null | {} };
const App = () => {
  let previousRouteName: string | undefined;
  enableScreens(true)
  TokenControllerInstance.setInitialTokens();

  useEffect(() => {
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
            <NotificationWatcher />
            <AnalyticsWatcher/>
            <RootStackScreen />
            <LoadingScreen />
          </NetworkInfo>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


export default App;
