import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator, { navigationRef } from '@navigation/rootnavigation';
import RootStackScreen from '@navigation/RootscreenStack';
import LoadingScreen from "@features/LoadingScreen";


declare const global: { HermesInternal: null | {} };
const App = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        RootNavigator.isReadyRef = true;
      }}
    >
      <RootStackScreen />
        <LoadingScreen />
    </NavigationContainer>
  );
};


export default App;
