import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { isAndroid } from "themes/functions";
export const MyStatusBar = ({backgroundColor,height, ...props}:any) => (
    <View style={[ { backgroundColor },{height}]}>
      <SafeAreaView>
        <StatusBar  translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
