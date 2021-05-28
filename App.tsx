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
import NotificationWatcher from '@components/notifications';

declare const global: { HermesInternal: null | {} };
const App = () => {
  TokenControllerInstance.setInitialTokens();
return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            RootNavigator.isReadyRef = true;
          }}
        >
          <NetworkInfo>
            <NotificationWatcher />
            <RootStackScreen />
            <LoadingScreen />
          </NetworkInfo>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


export default App;
