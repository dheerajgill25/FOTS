import React from 'react';
import { Image, StyleSheet } from 'react-native';
interface LogoTitleProps{
    showOnlyLogo?:boolean
}
const styles = StyleSheet.create({
    logo: {
        width: 79,
        height: 44,
        resizeMode: 'contain',
        flex: 1,
        alignSelf: 'center',
    },
});

export default function LogoTitle({showOnlyLogo}:LogoTitleProps) {
    const IMAGEURL = require("../../../assets/images/logo.png")
    return <Image style={styles.logo} source={IMAGEURL} />
}
