import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { isAndroid } from "themes/functions";
export const MyStatusBar = ({backgroundColor,height= StatusBar.currentHeight, ...props}:any) => (
    <View style={[ { backgroundColor },{height}]}>
      <SafeAreaView>
        <StatusBar  translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
