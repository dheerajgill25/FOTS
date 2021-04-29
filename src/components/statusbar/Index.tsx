import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { isAndroid } from "themes/functions";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT =isAndroid  ? 56 : 44;
export const MyStatusBar = ({backgroundColor, ...props}:any) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
      },
  });