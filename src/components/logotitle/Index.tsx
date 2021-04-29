import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 50,
        resizeMode: 'contain',
        flex: 1,
        alignSelf: 'center',
    },
});

export default function LogoTitle() {
    const IMAGEURL = require("../../../assets/images/logo.png")
    return <Image style={styles.logo} source={IMAGEURL} />
}
