import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator, { navigationRef } from '@navigation/rootnavigation';
import RootStackScreen from '@navigation/RootscreenStack';
import LoadingScreen from "@features/LoadingScreen";
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { persistor, store } from './src/reduxModule';

declare const global: { HermesInternal: null | {} };
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            RootNavigator.isReadyRef = true;
          }}
        >
          <RootStackScreen />
          <LoadingScreen />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


export default App;
