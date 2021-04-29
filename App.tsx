import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator, { navigationRef } from '@navigation/rootnavigation';
import RootStackScreen from '@navigation/RootscreenStack';


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
    </NavigationContainer>
  );
};


export default App;
